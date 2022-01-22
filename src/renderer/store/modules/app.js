import { make } from 'vuex-pathify'

export const state = {
    time: 0,
    started: 0,

    config: {
        lang: 'en',
        style: 'light',
        useHB: false,
        useHBRoot: 'http://api.pkg-zone.com/',
    },

    server: {
        ip: '',
        port: '8337',
        app: 'express',
        base_path: '',
        auto_scan_on_startup: true,
        scan_subdir: false,
    },

    ps4: {
        ip: '',
        app: 'rpi',
        name: '',
        port: 12800,
        timeout: 2500,
        update: 2200,
    },

}


// make all mutations
export const mutations = {
    ...make.mutations(state),

    addTime(state){
        state.time++
    },

    addStarted(state){
        state.started++
    },

    resetServer(state){
        state.server =  {
            ip: '',
            port: '8337',
            app: 'express',
            base_path: '',
            auto_scan_on_startup: true,
            scan_subdir: false,
        }

        state.ps4 = {
            ip: '',
            name: '',
            port: 12800,
            timeout: 2500,
            update: 2200,
        }
    },

    resetConfig(state){
        state.config = {
            lang: 'en',
            style: 'light',
            useHB: false,
            useHBRoot: 'http://api.pkg-zone.com/',
        }
    },

    saveServer(state){
        state.server = state.server
    },
}

// actions
export const actions = {
    ...make.actions(state),

    addTime( { state, commit }){
      commit('addTime')
    },

    started({commit}){
      commit('addStarted')
    },

    reset({ commit }){
      commit('resetServer')
    },

    save({ commit }){
      commit('saveServer')
    },

    resetConfig({ commit }){
      commit('resetConfig')
    },

    // addFiles({ commit, dispatch, state}, payload){
    //     commit('addFiles', payload)
    // }
}

// getters
export const getters = {
  // make all getters (optional)
  ...make.getters(state),

  getPS4IP(state){
      return state.ps4.ip + ':' + state.ps4.port
  },

  getPS4Timeout(state){
      return state.ps4.timeout
  },

  getServerIP(state){
      return state.server.ip + ':' + state.server.port
  },

  // overwrite default `items` getter
  // allFiles: state => {
  //     return state.images
  // },
}
