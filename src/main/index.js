import { app, session, BrowserWindow, Notification, ipcMain } from 'electron'
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
const showServerDevtools = false
const showPS4DevTools = false
const showMainDevTools = process.env.NODE_ENV !== 'production'

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
    width: 1000, height: 700,
  }, showMainDevTools)

  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', () => { windows.main = null })

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
    width: 340, height: 600, title: 'Info', show: false,
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

    ipcMain.on('main', (event, data) => windows.main.webContents.send('main', data) )
    ipcMain.on('main-error', (event, data) => windows.main.webContents.send('main-error', data) )
    ipcMain.on('main-route', (event, data) => windows.main.webContents.send('main-route', data) )

    ipcMain.on('ps4', (event, data) => windows.ps4.webContents.send('ps4', data) )

    ipcMain.on('error', (event, data) => windows.main.webContents.send('error', data) )
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// fix quit issue when open windows are left
app.on('before-quit', () => {
  console.log("Closing applications")
  Object.values(windows).map( (win) => {
    win.removeAllListeners('close')
    win.close()
  })
})

//  activate hook
app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (windows.main === null) {
    windows.main = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow()
  createServerWindow()
  createInfoWindow()
  createPS4Window()

  menu.createMenu()
  tray.createTray()

  new Notification({ title: 'PS4 Remote PKG Sender', body: 'Welcome to PS4 Remote PKG Installer. \nStart your Remote Package Installer App on your PS4 and add your PKG files here. \nHave fun.' }).show()
  registerChannel()
  // hearthbeat()
})


export default windows
