import { BrowserWindow, Menu, ipcMain, app, nativeImage } from 'electron'
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
        window.webContents.setUserAgent("StoreHAX")
        
        if (isDevelopment) {
          window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` + '#' + to)
        }
        else {
          window.loadURL('file://' + path.join(__dirname, 'index.html') + '#' + to)
          // window.loadURL(formatUrl({
          //   pathname: path.join(__dirname, 'index.html'+ '#' + to),
          //   protocol: 'file',
          //   slashes: true
          // }))
        }
    },

    setErrorHandler(window){
        window.onerror = (error, url, line) => {
            console.log(error, url, line)
            alert("Window Error" + error)
            // ipcMain.on('error', (event, data) => window.webContents.send('error', data) )
        }

        window.webContents.on('did-fail-load', (event, errorCode, errorDescription, validateURL, isMainFrame, frameProcessId, frameRoutingId) => {
            console.log(event, errorCode, errorDescription, validateURL, isMainFrame, frameProcessId, frameRoutingId)
            alert("loading failed" + errorDescription)
            // ipcMain.on('error', (event, data) => window.webContents.send('error', data) )
        })
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

        this.setErrorHandler(window)

        return window
    },

    autocloseAfterDownload(window){
        // window.webContents.on('new-window', (createEvent, contents) => {
        //     console.log("Web content created")
        //     console.log(createEvent.sender)
        //     console.log(contents)
        //
        //     let newWindow = BrowserWindow.fromWebContents(createEvent.sender)
        //     console.log(newWindow)
        //     newWindow.setContentSize(10,10)
        // })
        window.webContents.session.on('will-download', (event, item, webContents) => {
           item.once('done', (event, state) => {
              BrowserWindow.fromWebContents(webContents).close();
           });
        });
    },

    getIconPath(){
        return path.join(__static, 'assets/ps_icon_white.png')
    },

    getAppIconPath(){
        return path.join(__static, 'assets/ps_icon_white.icns')
    },


}
