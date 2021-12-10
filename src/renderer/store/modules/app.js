import { make } from 'vuex-pathify'

export const state = {
    time: 0,
    started: 0,
    server: {
        ip: '',
        port: '8337',
        app: 'express',
        base_path: '',
    },

    ps4: {
        ip: '',
        name: '',
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
        }

        state.ps4 = {
            ip: '',
            name: ''
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
