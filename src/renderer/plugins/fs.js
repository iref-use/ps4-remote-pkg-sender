import Vue from 'vue'
import fs from 'fs'
import path from 'path'

const getFiles = (folder, deep=false) => {
    const files = []
    for (const file of fs.readdirSync(folder, { widthFileTypes: true }) ) {
        // fix permission error on external drives for darwin
        let forbidden = ['$RECYCLE.BIN', 'desktop.ini', '.Spotlight', '.Spotlight-V100', '.Trashes'].includes(file)

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
        console.log(":: fs | Create File Item", item)
        let isFile = this.isFile(item)

        if(!isFile) return false

        let fileName = path.basename(item)
        let fullPath = path.resolve(folder, item)
        let patchedFilename = fileName.replace(/[^a-zA-Z0-9-_.]/g, '');
        let stats = fs.lstatSync(fullPath)
        // let stats = isFile ? fs.statSync(item) : null
        // let size = (stats.size / (1024*1024*1024)).toFixed(3)
        let size = this.formatBytes(stats.size, 2)

        // title location 0x40 to 0x63
        // cusa location 0x47 to 0x4F

        return {
            name: fileName,
            cusa: '',
            status: 'n/a',
            percentage: 0,
            task: '',
            ext: path.extname(item),
            path: fullPath,
            isFile,
            patchedFilename,
            sizeInBytes: stats.size,
            size,
            logs: [],
            // stats,
        }
    },

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

}

Vue.prototype.$fs = o

export default o
