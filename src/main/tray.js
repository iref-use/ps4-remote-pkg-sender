import { Menu, Tray, nativeImage } from 'electron'
import helper from './helper'
import windows from './index'

let tray

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
        { label: 'Install new PKG' },
        { label: 'Show Tasks' },
        { label: 'Show Server listed PKGs', click: () => windows.server.show() },
        { label: 'Separator', type: 'separator'},
        { label: 'Info', click: () => windows.info.show() }
      ])

      tray.setContextMenu(contextMenu)
      // tray.setTitle("PS4 RPI")
  }

}
