import { app, Menu, Tray, nativeImage } from 'electron'
import helper from './helper'
import windows from './index'

let tray

function showProcessingCenter(){
    windows.main.show()
    windows.main.webContents.send('main-route', 'home')
}

function showServerList(){
  windows.main.show()
  windows.main.webContents.send('main-route', 'server')
}

export default {
  tray,

  createTray(){
      // use https://svgtopng.com/ to convert svg to png
      const iconURL = helper.getIconPath()
      const icon = nativeImage.createFromPath(iconURL)

      tray = new Tray(iconURL)

      const contextMenu = Menu.buildFromTemplate([
        { label: 'Open PS4 Remote PKG Installer', click: () =>  windows.main.show() },
        { label: 'Open Server', click: () => windows.server.show() },
        { label: 'Separator', type: 'separator'},

        // { label: 'Install new PKG' },
        { label: 'Show Processing Center', click: () => showProcessingCenter() },
        { label: 'Show Server listed PKGs', click: () => showServerList() },
        { label: 'Separator', type: 'separator'},

        { label: 'PS4 API Logs', click: () => windows.ps4.show() },
        { label: 'Separator', type: 'separator'},

        { label: 'Info', click: () => windows.info.show() },
        { label: 'Separator', type: 'separator'},

        { label: "Quit Application", click: () => { app.quit() } },
      ])

      tray.setContextMenu(contextMenu)
      // tray.setTitle("PS4 RPI")
  }

}
