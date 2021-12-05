import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

import menuTemplate from './menu'

export default {
    installDevtools(window){
        window.webContents.on('did-frame-finish-load', () => {
          require('vue-devtools').install()
          window.webContents.openDevTools()
        })

        window.webContents.on('devtools-opened', () => {
          window.focus()
          setImmediate(() => {
            window.focus()
          })
        })
    },

    setDevtools(window){
        if (isDevelopment) {
          this.installDevtools(window)
        }
    },

    setWindowLoadURL(window){
        if (isDevelopment) {
          window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
        }
        else {
          window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
          }))
        }
    },

    createBaseWindow(){
        return new BrowserWindow({
            height: 600,
            width: 900,
            icon: nativeImage.createFromDataURL(this.getAppIconPath()),
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                nodeIntegration: true
            }
        })
    },

    createWindowInstance(){
        const window = this.createBaseWindow()

        this.setDevtools(window)
        this.setWindowLoadURL(window)
        return window
    },

    createMenu(){
        Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    },

    createTray(){
        let tray;

        // use https://svgtopng.com/ to convert svg to png
        const iconURL = this.getIconPath()
        const icon = nativeImage.createFromPath(iconURL)

        tray = new Tray(iconURL)

        const contextMenu = Menu.buildFromTemplate([
          { label: 'Open PS4 Remote PKG Installer' },
          { label: 'Install new PKG' },
          { label: 'Show Tasks' },
          { label: 'Show Server listed PKGs', type: 'radio', checked: false },
          { label: 'Separator', type: 'separator'},
          { label: 'Info' }
        ])

        tray.setContextMenu(contextMenu)
        // tray.setTitle("PS4 RPI")
    },

    getIconPath(){
        return path.join(__static, 'assets/ps_icon_white.png')
    },

    getAppIconPath(){
        return path.join(__static, 'assets/ps_icon_white.icns')
    },


}
