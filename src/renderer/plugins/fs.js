import Vue from 'vue'
import fs from 'fs'
import path from 'path'

let o = {

    readDirSync(path=''){
        if(!path){
            console.log("No base_path given for the server.")
            return
        }

        console.log("Loading Directory files in ", path)
        return fs.readdirSync(path, { withFileTypes: true })
                 .map( item => this.createItem(item) )
                 .filter( item => item.isFile )
                 .filter( item => item.ext.includes('pkg'))
    },

    isFile(pathItem) {
        return !!path.extname(pathItem)
    },

    createItem(item){
        let isFile = this.isFile(item)
        // let stats = isFile ? fs.statSync(item) : null

        return {
            name: item,
            cusa: '',
            status: 'init',
            percentage: 0,
            task: '',
            ext: path.extname(item),
            isFile,
            // stats,
        }
    },

}

Vue.prototype.$fs = o

export default o
