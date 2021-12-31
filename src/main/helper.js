import { BrowserWindow, Menu, app, nativeImage } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
    installDevtools(window){
        window.webContents.on('did-frame-finish-load', () => {
          require('vue-devtools').install()
          // BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')
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

    setWindowLoadURL(window, to='/'){
        if (isDevelopment) {
          window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` + '#' + to)
        }
        else {
          window.loadURL('file://' + path.join(__dirname, 'index.html' + '#' + to))
          // window.loadURL(formatUrl({
          //   pathname: path.join(__dirname, 'index.html'+ '#' + to),
          //   protocol: 'file',
          //   slashes: true
          // }))
        }
    },

    createBaseWindow(args={}){
        let params = {
            minHeight: 900,
            minWidth: 600,
            height: 600,
            width: 900,
            // frame: false,
            title: 'PS4 Remote Package Sender',
            icon: nativeImage.createFromDataURL(this.getAppIconPath()),
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                allowRunningInsecureContent: true,
                nodeIntegration: true,
                enableRemoteModule: true,
            }
        }

        if(args.width)
          params.minWidth = args.width

        if(args.height)
          params.minHeight = args.height

        return new BrowserWindow({...params, ...args})
    },

    createWindowInstance(to='/', args={}, debug=false){
        const window = this.createBaseWindow(args)

        if(debug)
        this.setDevtools(window)

        this.setWindowLoadURL(window, to)

        return window
    },

    getIconPath(){
        return path.join(__static, 'assets/ps_icon_white.png')
    },

    getAppIconPath(){
        return path.join(__static, 'assets/ps_icon_white.icns')
    },


}
