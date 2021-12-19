import Vue from 'vue'
import fs from 'fs'
import path from 'path'

const getFiles = folder => {
    const files = []
    for (const file of fs.readdirSync(folder)) {
        const fullPath = path.join(folder, file)
        if(fs.lstatSync(fullPath).isDirectory()){
            getFiles(fullPath).forEach( x => files.push(x) )
        }
        else {
            files.push(fullPath)
        }
    }
    return files
}

let o = {

    readDirSync(folder='', scan_subdir=false){
        if(!folder){
            console.log("::fs | No base_path given for the server.")
            return
        }

        console.log("Loading Files from Subdirectory", scan_subdir)
        console.log("Loading Directory files in ", folder)

        if(scan_subdir)
          return this.readSubDirectory(folder)
        else
          return this.readDirectory(folder)

        console.log("Found files " + files.length, files)
        return files
    },

    readDirectory(folder){
        return fs.readdirSync(folder, { withFileTypes: true })
                 .filter( item => this.isPKG(item) )
                 .map( item => this.createItem(item, folder) )
    },

    readSubDirectory(folder){
        let files = getFiles(folder)
            .filter( file => this.isPKG(file) )
            .map( item => this.createItem(item, folder) )

        // console.log("walked files", files)
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
        let fileName = path.basename(item)
        let patchedFilename = fileName.replace(/[^a-zA-Z0-9-_.]/g, '');
        // let stats = isFile ? fs.statSync(item) : null

        if(!isFile) return false

        // title location 0x40 to 0x63
        // cusa location 0x47 to 0x4F

        return {
            name: fileName,
            cusa: '',
            status: 'n/a',
            percentage: 0,
            task: '',
            ext: path.extname(item),
            path: path.resolve(folder, item),
            isFile,
            patchedFilename,
            // stats,
        }
    },

}

Vue.prototype.$fs = o

export default o
