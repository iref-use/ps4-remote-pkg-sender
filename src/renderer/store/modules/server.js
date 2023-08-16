import { make } from 'vuex-pathify'
import fs from './../../plugins/fs.js'

export const state = {
    files: [],
    draggedFiles: [],
    draggedServingFiles: [],
    serverFiles: [],
    servingFiles: [],
    routes: [],
    logs: [],
    status: 'stopped',
    loading: false,
    app: null,
}


// make all mutations
export const mutations = {
    ...make.mutations(state),

    addLog(state, payload){
      state.logs.unshift(payload)
    },

    resetLogs(state){
        state.logs = []
    },
}

// actions
export const actions = {
    ...make.actions(state),

    loadFiles({ commit, state, rootState, rootGetters }, path){
        if(!path){
            console.log("::store | no path given for base_path")
            return
        }

        // commit('loading', true)
        console.log("::store | Read files at base path ", path);
        let scan_subdir = rootGetters['app/server'].scan_subdir
        let files = fs.getFilesFromBasePath(path, scan_subdir)

        // console.log("::store | patched files", files)
        commit('serverFiles', files)
        // commit('loading', false)
    },

    addLog({ commit, state }, message){
        // console.log(message)
        commit('addLog', {
            time:  Date.now(),
            message,
        })
    },

    resetLogs({ commit}){
        commit('resetLogs')
    },
    startLoading({ commit }){
        commit('loading', true)
    },
    stopLoading({ commit }){
        commit('loading', false)
    },

    // prepare to handle the actions through vuex
    // startServer({ commit }, msg){
    //     ipcRenderer.send('server', 'start')
    // },
    // stopServer({ commit }, msg){
    //     ipcRenderer.send('server', 'stop')
    // },
    // toggleServer({ commit }, msg){
    //     ipcRenderer.send('server', 'toggle')
    // },
    // refreshServer({ commit }, msg){
    //     ipcRenderer.send('server', 'refresh')
    // },

    // addFiles({ commit, dispatch, state}, payload){
    //     commit('addFiles', payload)
    // }
}

// getters
export const getters = {
  // make all getters (optional)
  ...make.getters(state),

  findFile: (state) => (file) => {
    return state.servingFiles.find( x => x.name == file.name)
  }
  // overwrite default `items` getter
  // allFiles: state => {
  //     return state.images
  // },
}
