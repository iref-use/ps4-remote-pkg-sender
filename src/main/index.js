'use strict'

import { app, session, BrowserWindow, Menu, Notification } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

import helper from './helper'

// set vars
const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

// Create Windows
function createMainWindow() {

  const window = helper.createWindowInstance()

  window.on('closed', () => {
    mainWindow = null
  })

  mainWindow = window

  new Notification({ title: 'PS4 Remote PKG Sender', body: 'Welcome to PS4 Remote PKG Installer. \nStart your Remote Package Installer App on your PS4 and add your PKG files here. \nHave fun.' }).show()
}


// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow()
  helper.createMenu()
  helper.createTray()
})
