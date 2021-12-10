import { app, session, BrowserWindow, Notification } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

import helper from './helper'
import menu from './menu'
import tray from './tray'

import store from './../renderer/store/index.js'

// set vars
const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let windows = {
  info: null,
  main: null,
}

// Create Windows
function createMainWindow() {
  const window = helper.createWindowInstance('/', {
    minWidth: 900,
    minHeight: 600,
  }, true)

  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })
  window.on('closed', () => { windows.main = null })

  windows.main = window

  // for hard debugging
  // mainWindow.webContents.openDevTools()
}

// function create Info Window
function createInfoWindow(){
  const info = helper.createWindowInstance('/info', {
    width: 300, height: 400, title: 'Info', show: false,
  })
  info.on('close', (event) => {
    event.preventDefault()
    info.hide()
  })
  info.on('closed', (event) => {windows.info = null })
  windows.info = info
}

// hearthbeat
function hearthbeat(){
  setInterval( () => {
    store.dispatch('app/addTime')
  }, 1000)
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

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (windows.main === null) {
    windows.main = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow()
  createInfoWindow()
  menu.createMenu()
  tray.createTray()

  new Notification({ title: 'PS4 Remote PKG Sender', body: 'Welcome to PS4 Remote PKG Installer. \nStart your Remote Package Installer App on your PS4 and add your PKG files here. \nHave fun.' }).show()
  hearthbeat()
})


export default windows
