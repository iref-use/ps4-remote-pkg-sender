import Vue from 'vue'
import fs from 'fs'
import path from 'path'

let o = {

    readDirSync(folder=''){
        if(!folder){
            console.log("::fs | No base_path given for the server.")
            return
        }

        console.log("Loading Directory files in ", folder)
        return fs.readdirSync(folder, { withFileTypes: true })
                 // .filter( item => item.isFile )
                 // .filter( item => item.ext.includes('pkg'))
                 // .filter( item => item.includes('.pkg') )
                 .filter( item => this.isFile(item) )
                 .map( item => this.createItem(item, folder) )
    },

    isFile(item) {
        return !!path.extname(item)
    },

    createItem(item, folder=''){
        console.log(":: fs | Create File Item", item)
        let isFile = this.isFile(item)
        let fullPath = path.resolve(folder, item)
        let patchedFilename = item.replace(/[^a-zA-Z0-9-_.]/g, '');
        // let stats = isFile ? fs.statSync(item) : null

        if(!isFile) return false

        return {
            name: item,
            cusa: '',
            status: 'n/a',
            percentage: 0,
            task: '',
            ext: path.extname(item),
            path: fullPath,
            isFile,
            patchedFilename,
            // stats,
        }
    },

}

Vue.prototype.$fs = o

export default o
