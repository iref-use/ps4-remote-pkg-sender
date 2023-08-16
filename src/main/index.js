import { app, session, BrowserWindow, Notification, ipcMain, globalShortcut, protocol } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

import helper from './helper'
import menu from './menu'
import tray from './tray'
import store from './../renderer/store/index.js'

import './crashReporter'

// set vars
const isDevelopment = process.env.NODE_ENV !== 'production'

const showServerWindowOnStartUp = false
const showServerDevtools = true
const showPS4DevTools = false
const showMainDevTools = isDevelopment

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let windows = {
  info: null,
  main: null,
  server: null,
  ps4: null,
}

// Create Windows
function createMainWindow() {
  const window = helper.createWindowInstance('/', {
    width: 1300, height: 800, frame: false,
  }, showMainDevTools)

  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', () => { windows.main = null })
  // window.webContents.openDevTools()

  // handle download child windows and autoclose
  helper.autocloseAfterDownload(window)

  windows.main = window

  // for hard debugging
  // mainWindow.webContents.openDevTools()
}

// create Server Window
function createServerWindow(){
  const window = helper.createWindowInstance('/app/Server', {
    width: 800, height: 500, title: 'Server', show: showServerWindowOnStartUp,
  }, showServerDevtools)
  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', (event) => { windows.server = null })
  windows.server = window
}

// create Info Window
function createInfoWindow(){
  const window = helper.createWindowInstance('/info', {
    width: 500, height: 600, title: 'Info', show: false,
  }, false)
  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', (event) => { windows.info = null })
  windows.info = window
}

// create Info Window
function createPS4Window(){
  const window = helper.createWindowInstance('/ps4', {
    width: 800, height: 800, title: 'PS4', show: false,
  }, showPS4DevTools)
  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', (event) => { windows.ps4 = null })
  windows.ps4 = window
}

// hearthbeat
function hearthbeat(){
  setInterval( () => {
    store.dispatch('app/addTime')
  }, 1000)
}

// registerChannel
function registerChannel(){
    ipcMain.on('server', (event, data) => windows.server.webContents.send('server', data) )
    ipcMain.on('server-show', () => windows.server.show() )
    ipcMain.on('show', (event, data) => showWindow(data) )

    ipcMain.on('main', (event, data) => windows.main.webContents.send('main', data) )
    ipcMain.on('main-error', (event, data) => windows.main.webContents.send('main-error', data) )
    ipcMain.on('main-route', (event, data) => windows.main.webContents.send('main-route', data) )

    ipcMain.on('ps4', (event, data) => windows.ps4.webContents.send('ps4', data) )

    ipcMain.on('error', (event, data) => windows.main.webContents.send('error', data) )
    ipcMain.on('notify', (event, data) => notify(data) )
    ipcMain.on('quit', () => app.quit() )
}

// add Shortcuts
function addShortcuts(){
    globalShortcut.register('CommandOrControl+C', () => {
      contents.copy()
    })

    globalShortcut.register('CommandOrControl+V', () => {
      contents.paste()
    })
}

// create Protocols
function createProtocols(){
    return;
    protocol.registerSchemesAsPrivileged([
      { scheme: 'http', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
      { scheme: 'https', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
      { scheme: 'mailto', privileges: { standard: true } },
    ]);
}

// notifications
function notify(data){
    new Notification(data).show()
}

// show window
function showWindow(data){
    if(data == 'ps4')
      windows.ps4.show()

    if(data == 'server')
      windows.server.show()

    if(data == 'info')
      windows.info.show()
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  console.log("All windows are closed. Kill all processes.")
  // on macOS it is common for applications to stay open until the user explicitly quits
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }

  app.quit()
})

// fix quit issue when open windows are left
app.on('before-quit', (event) => {
  console.log("Closing applications")

  console.log("Closing Server")
  windows.server.webContents.send('server', 'stop')

  setTimeout(() => {
    Object.values(windows).map( (win) => {
      if(!win){
          return console.log("No win object")
      }

      win.removeAllListeners('close')
      win.close()
    })
  }, 500)

  console.log("Application closed.")
})

//  activate hook
app.on('activate', () => {
  windows.main.show()
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow()
  createServerWindow()
  createInfoWindow()
  createPS4Window()
  createProtocols()

  // addShortcuts()

  menu.createMenu()
  tray.createTray()

  new Notification({ title: 'PS4 Remote PKG Sender', body: 'Welcome to PS4 Remote PKG Installer. \nStart your Remote Package Installer App on your PS4 and add your PKG files here. \nHave fun.' }).show()
  registerChannel()
  // hearthbeat()
})


export default windows
