/*
  flatZ RPI API

  Checking if app exists (also tells its size if exists):
    curl --data '{"title_id":"CUSA09311"}' 'http://<PS4 IP>:12800/api/is_exists'

  Installing main package (if you have multiple pieces you should specify all of them in packages array in consecutive order; if you use a merged file then you just need to specify a single element for this array):
    curl -v 'http://<PS4 IP>:12800/api/install' --data '{"type":"direct","packages":["http://<local ip>:<local port>/UP1004-CUSA03041_00-REDEMPTION000002.pkg"]}'

  Installing main package from CDN:
    curl -v 'http://<PS4 IP>:12800/api/install' --data '{"type":"ref_pkg_url","url":"http://gs2.ww.prod.dl.playstation.net/gs2/appkgo/prod/CUSA02299_00/2/f_b215964ca72fc114da7ed38b3a8e16ca79bd1a3538bd4160b230867b2f0a92e0/f/UP9000-CUSA02299_00-MARVELSSPIDERMAN.json"}'

  Installing patch package:
    curl -v 'http://<PS4 IP>:12800/api/install' --data '{"type":"direct","packages":["http://<local ip>:<local port>/UP9000-CUSA02299_00-MARVELSSPIDERMAN-A0108-V0100_0.pkg","http://<local ip>:<local port>/UP9000-CUSA02299_00-MARVELSSPIDERMAN-A0108-V0100_1.pkg","http://<local ip>:<local port>/UP9000-CUSA02299_00-MARVELSSPIDERMAN-A0108-V0100_2.pkg"]}'

  Installing additional content:
    curl -v 'http://<PS4 IP>:12800/api/install' --data '{"type":"direct","packages":["http://<local ip>:<local port>/UP0001-CUSA09311_00-ULCQUEST00000002.pkg"]}'

  Installing theme:
    curl -v 'http://<PS4 IP>:12800/api/install' --data '{"type":"direct","packages":["http://<local ip>:<local port>/UP0001-CUSA09311_00-ACDNEWTHEME12345.pkg"]}'

  Uninstalling game:
    curl -v 'http://<PS4 IP>:12800/api/uninstall_game' --data '{"title_id":"CUSA02299"}'

  Uninstalling patch:
    curl -v 'http://<PS4 IP>:12800/api/uninstall_patch' --data '{"title_id":"CUSA08344"}'

  Uninstalling additional content:
    curl -v 'http://<PS4 IP>:12800/api/uninstall_ac' --data '{"content_id":"UP0001-CUSA09311_00-ULCPACK000000004"}'

  Uninstalling theme:
    curl -v 'http://<PS4 IP>:12800/api/uninstall_theme' --data '{"content_id":"UP9000-CUSA08344_00-DETROITCHARTHEME"}'

  You could also work with tasks themselves (pause, continue, remove, etc), you just need to know task id, it could be retrieved in a response when you send installation commands.

  Starting task (tasks are started automatically but you could use this command if you have stopped task manually, for example):
    curl -v 'http://<PS4 IP>:12800/api/start_task' --data '{"task_id":123}'

  Stopping task:
    curl -v 'http://<PS4 IP>:12800/api/stop_task' --data '{"task_id":123}'

  Pausing task:
    curl -v 'http://<PS4 IP>:12800/api/pause_task' --data '{"task_id":123}'

  Resuming task:
    curl -v 'http://<PS4 IP>:12800/api/resume_task' --data '{"task_id":123}'

  Unregistering (removing) task:
    curl -v 'http://<PS4 IP>:12800/api/unregister_task' --data '{"task_id":123}'

  Getting task progress information:
    curl -v 'http://<PS4 IP>:12800/api/get_task_progress' --data '{"task_id":123}'

  Finding task id by content id and sub type:
    curl -v 'http://<PS4 IP>:12800/api/find_task' --data '{"content_id":"UP1004-CUSA03041_00-REDEMPTION000002","sub_type":6}'

  Task sub types:
    Game=6, AC=7, Patch=8, License=9
*/

import Vue from 'vue'
import axios from './axios'
import store from './../store'
import { get } from 'vuex-pathify'
import { ipcRenderer } from 'electron'

let ps4 = {

    type: {
        game: 6,
        ac: 7,
        patch: 8,
        license: 9,
    },

    debug(){
        // let ps4ip = get('app/getPS4IP'); // store.getters['app/getPS4IP']
        let ps4ip = store.getters['app/getPS4IP']
        console.log("Check PS4 IP " + ps4ip)
    },

    getURL(of='ps4'){
        // let ps4ip = store.getters['app/getPS4IP']
        // let serverip = store.getters['app/getServerIP']

        if(of == 'ps4')
          return 'http://' + store.getters['app/getPS4IP']

        if(of == 'server')
          return 'http://' + store.getters['app/getServerIP']

        return ''
    },

    getTimeout(min=2000){
        let timeout = store.getters['app/getPS4Timeout']
        return timeout < min ? min : timeout
    },

    request(url, data, options={}){
        let defaultOptions = { headers: { 'content-type':'application/x-www-form-urlencoded' } }

        console.log("Request", url, data, options)
        return axios.post(url, data, { ...defaultOptions, ...options})
                .catch( e => {
                    console.log("PS4 Plugin Error catcher", e)

                    if(e.response && e.response.message == 'Playstation not available'){
                        ipcRenderer.send('main-error', e.response.message)
                        throw e
                    }

                    if(e.response && e.status === 4408){
                        ipcRenderer.send('main-error', e.response.message)
                        throw e
                    }

                    if(e.status == 500 || (e.response && e.response.status && e.response.status == 500) ){
                        console.log(e, e.response)
                        ipcRenderer.send('main-error', e.response.data.error)
                        throw e
                        // return e.response
                    }

                    if(!e.response){
                        // console.log("Network Error, is playstation on?")
                        // this.$message({ 
                        //     dangerouslyUseHTMLString: true,
                        //     message: "Network Error. <br>Is the Remote Pakage Installer is running on Playstation?",
                        //     type: 'error'
                        // })
                        throw e
                    }
                })
                .then( response => {
                    console.log("PS4 API Response", response)

                    let data = response.data

                    if(data.status && data.status == 'fail'){
                        // Found Error Codes
                        // 2157510677 error on double install?
                        // 2157510663 already installed?
                        // 2157510681 task doesn't exist
                        // 2157510789 (not known)
                        let code = data.error_code
                        let message = code

                        if(code==2157510681)
                          message = code + " | task doesn't exist (?)"

                        if(code==2157510663)
                          message = code + " | already installed (?)"

                        if(code==2157510677)
                          message = code + " | It seems to be installed already."

                        ipcRenderer.send('main-error', "Error " + message)
                        throw data
                    }

                    return response
                })
    },

    checkServer(){
        let url = this.getURL('server') + '/hb'
        return axios.get(url)
    },

    checkPS4(){
        return this.request(this.getURL() + '/api/is_exists', { title_id: 'CUSA000000' }, { timeout: this.getTimeout() })
                  .then( res => {
                      console.log("Check PS4 Response", res)
                      return res
                  })
    },

    isInstalled(file){
        console.log("Check if cusa is exists ", file, file.cusa)

        return this.request(this.getURL() + '/api/is_exists', { title_id : file.cusa }, { timeout: this.getTimeout() })
                .then( res => {
                    let data = res.data
                    let message = ''
                    let type = ''
                    let exists = data.exists == 'true'
                    let size = ''

                    if(exists){
                        message = file.name + ' ' + 'exists already on your PS4' // and have ' + this.$fs.formatBytes(data.size)
                        type = 'warning'
                        size = data.size
                    }
                    else {
                        message = file.name + ' can be installed.'
                        type = 'success'
                    }

                    return { data: {
                        message,
                        type,
                        exists,
                        size,
                    }}
                })
    },

    install(file){
        if(!file.url){
            return console.log("Cannot find path for file " + file.name )
        }

        return this.request(this.getURL() + '/api/install', { type : 'direct', packages: [file.url] }, { timeout: this.getTimeout() })
    },

    pause(file){
        return this.request(this.getURL() + '/api/pause_task', { task_id: file.task }, { timeout: this.getTimeout() })
    },

    stop(file){
        return this.request(this.getURL() + '/api/stop_task', { task_id: file.task }, { timeout: this.getTimeout() })
    },

    resume(file){
        return this.request(this.getURL() + '/api/resume_task', { task_id: file.task }, { timeout: this.getTimeout() })
    },

    remove(file){
        return this.request(this.getURL() + '/api/unregister_task', { task_id: file.task }, { timeout: this.getTimeout() })
    },

    getTask(file){
        return this.request(this.getURL() + '/api/get_task_progress', { task_id: file.task }, { timeout: this.getTimeout() })
    },

    find(file){
        return this.request(this.getURL() + '/api/find_task', { content_id: file.patchedFilename, sub_type: 6 }, { timeout: this.getTimeout() })
    },

}

Vue.prototype.$ps4 = ps4
