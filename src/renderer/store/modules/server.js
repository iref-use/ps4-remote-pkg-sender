import { make } from 'vuex-pathify'
import fs from './../../plugins/fs.js'

export const state = {
    tasks: [],
    files: [],
    serverFiles: [],
    servingFiles: [],
    routes: [],
    queue: [],
    logs: [],
    status: 'stopped',
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
        console.log("::store | Read files at base path ", path);
        let scan_subdir = rootGetters['app/server'].scan_subdir
        let files = fs.readDirSync(path, scan_subdir)
        // console.log("::store | patched files", files)
        commit('serverFiles', files)
    },

    addLog({ commit, state }, message){
        console.log(message)
        commit('addLog', {
            time: Date.now(),
            message,
        })
    },

    resetLogs({ commit}){
        commit('resetLogs')
    },

    // addFiles({ commit, dispatch, state}, payload){
    //     commit('addFiles', payload)
    // }
}

// getters
export const getters = {
  // make all getters (optional)
  ...make.getters(state),

  // overwrite default `items` getter
  // allFiles: state => {
  //     return state.images
  // },
}
