import Vue from 'vue'
import fs from 'fs'
import path from 'path'
import store from './../store'

// const shouldPrefix  = store.getters['app/getPrefixFullPath']

const getFiles = (folder, deep=false) => {
    const files = []

    try {
        for (const file of fs.readdirSync(folder, { withFileTypes: true }) ) {
            // fix permission error on external drives for darwin
            let forbidden = ['$RECYCLE.BIN', 'desktop.ini', '.Spotlight', '.Spotlight-V100', '.Trashes', '.Trash', 'Thumbs.db', '.DS_Store'].includes(file)

            if(forbidden){
                continue
            }

            const fullPath = path.join(folder, file)
            if(fs.lstatSync(fullPath).isDirectory() && deep){
                getFiles(fullPath, deep).forEach( x => files.push(x) )
            }
            else {
                files.push(fullPath)
            }
        }
    }
    catch( e ){
        console.log("Error reading folder", folder)
    }

    return files
}

let o = {

    getFilesFromBasePath(folder='', scan_subdir=false){
        if(!folder){
            console.log("::fs | No base_path given for the server.")
            return
        }

        console.log("Loading Files from Subdirectory", scan_subdir)
        console.log("Loading Directory files in ", folder)

        return getFiles(folder, scan_subdir)
            .filter( file => this.isPKG(file) )
            .map( item => this.createItem(item, folder) )

        console.log("Found files " + files.length)
        return files
    },

    getFiles,

    getFileName(p=null){
        if( !p ) return 'n/a'

        return path.basename(p)
    },

    getFileSize(p=null, d=2, returnBytes=false){
        if( !p ) return 'n/a'

        let stats = fs.statSync(p)
        if( stats && stats.size )
            return returnBytes ? stats.size : this.formatBytes(stats.size, d)

        return 'n/a'
    },

    walk(folder){
        console.log("Walking Directory", folder)
        const files = fs.readdirSync(folder);
        files
              // .filter( item => item.includes('.pkg') )
              // .filter( item => this.isFile(item) )
              .forEach((file) => {
                  let filepath = path.join(folder, file);
                  let fullPath = path.resolve(folder, file)
                  let isDir    = fs.lstatSync(filepath).isDirectory()

                  console.log(fullpath, filePath)

                  if(isDir){
                    console.log("Found directory", fullPath)
                    this.walk(fullPath);
                  }
                  else {
                    if(this.isPKG(file))
                      this.createItem(file, fullPath);
                  }
              });

        return files
    },

    isFile(item) {
        return !!path.extname(item)
    },

    isPKG(item){
        return path.extname(item).includes('pkg')
    },

    createItem(item, folder=''){
        const shouldPrefix  = store.getters['app/getPrefixFullPath']

        // console.log(":: fs | Create File Item", item)
        let isFile = this.isFile(item)

        if(!isFile) return false

        let fileName = path.basename(item)
        let fullPath = path.resolve(folder, item)
        let patchedFilename; // = shouldPrefix ? fullPath.replace(/[^a-zA-Z0-9-_./]/g, '') : fileName.replace(/[^a-zA-Z0-9-_.]/g, '');

        if(shouldPrefix){
            patchedFilename = (fullPath.charAt(0) == "/") ? fullPath.substr(1).replace(/[^a-zA-Z0-9-_./]/g, '') : fullPath.replace(/[^a-zA-Z0-9-_./]/g, '')
        }
        else {
            patchedFilename = fileName.replace(/[^a-zA-Z0-9-_.]/g, '');
        }

        let stats = fs.lstatSync(fullPath)
        let size  = this.formatBytes(stats.size, 2)
        let regex = /(CUSA\d{5})/i

        // let cusa  = regex.test(fileName) ? fileName.match(regex)[0] : 'not found' // overhead?
        let searchCUSA = fileName.match(/(CUSA\d{5})/i)
        let cusa = searchCUSA ? searchCUSA[0].toUpperCase() : ''

        // #todo get pkg deep info with https://github.com/dexter85/ps4-pkg-info

        // title location 0x40 to 0x63
        // cusa location 0x47 to 0x4F

        return {
            name: fileName,
            status: 'n/a',
            percentage: 0,
            rest: 0,
            task: '',
            ext: path.extname(item),
            path: fullPath,
            url: null,
            type: 'local',
            cusa,
            isFile,
            patchedFilename,
            sizeInBytes: stats.size,
            size,
            logs: [],
            // stats,
        }
    },

    createItemFromHBLegacy(item, root=''){
        let fullPath = root + 'dl.php?tid=' + item.id
        let patchedFilename = item.name.replace(/[^a-zA-Z0-9-_.]/g, '')
        let fileName = item.name + ' (version '+item.version+')'
        let size = item.Size ? item.Size.replace('s', '') : 'n/a'

        return {
            name: item.name,
            status: 'remote',
            percentage: 0,
            rest: 0,
            task: '',
            ext: 'remote', // path.extname(item),
            path: fullPath,
            url: fullPath,
            type: 'remote',
            cusa: item.id,
            isFile: true,
            patchedFilename,
            sizeInBytes: size, // stats.size,
            size: size,
            logs: [],
            // stats,
            data: item
        }
    },

    createItemFromHBRefactored(item, root=''){
        let patchedFilename = item.name.replace(/[^a-zA-Z0-9-_.]/g, '')
        let size = item.size ? this.formatBytes(item.size) : 'n/a'
        // patch file url to stream
        // let filePath = item.file.replace('attachments/', 'attachments/stream/')
        let filePath = item.file ? item.file.replace('https', 'http') : item.file

        return {
            name: item.name,
            status: 'remote',
            percentage: 0,
            rest: 0,
            task: '',
            ext: 'pkg', // path.extname(item),
            path: filePath,
            url: filePath,
            type: item.type,
            cusa: item.cusa,
            isFile: true,
            patchedFilename,
            sizeInBytes: size, // stats.size,
            size: size,
            logs: [],
            // stats,
            data: item
        }
    },

    createItemFromURL(item){
        let patchedFilename = item.name.replace(/[^a-zA-Z0-9-_.]/g, '')
        let fullPath = item.url
        let size = 'n/a'

        return {
            name: item.name,
            status: 'url',
            percentage: 0,
            rest: 0,
            task: '',
            ext: 'remote', // path.extname(item),
            path: fullPath,
            url: fullPath,
            type: 'remote',
            cusa: item.cusa,
            isFile: true,
            patchedFilename,
            sizeInBytes: size, // stats.size,
            size: size,
            logs: [],
            // stats,
        }
    },

    createItemFromDraggedFile(draggedFilePath){
        let name            = path.basename(draggedFilePath)
        let patchedFilename = name.replace(/[^a-zA-Z0-9-_.]/g, '')
        let size            = this.getFileSize(draggedFilePath, 2, true)
        let searchCUSA      = name.match(/(CUSA\d{5})/i)
        let cusa            = searchCUSA ? searchCUSA[0].toUpperCase() : ''        
        
        return {
            name,
            status: 'Dragged',
            percentage: 0,
            rest: 0,
            task: '',
            ext: path.extname(draggedFilePath),
            path: draggedFilePath,
            url: null,
            type: 'dragged',
            cusa,
            isFile: true,
            patchedFilename,
            sizeInBytes: size,
            size: this.formatBytes(size, 2),
            logs: [],
            // stats,
        }
    },

    formatBytes(bytes=null, decimals=2, k=1000) {
        if (!bytes) return 'n/a';
        if (bytes === 0) return '0 Bytes';

        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

}

Vue.prototype.$fs = o

export default o
