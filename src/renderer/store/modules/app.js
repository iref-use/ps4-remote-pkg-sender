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
}


// make all mutations
export const mutations = {
    ...make.mutations(state),

    setTime(state){
        state.time++
    },

    resetServer(state){
        state.server =  {
            ip: '',
            port: '8337',
            app: 'express',
            base_path: '',
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
      commit('setTime')
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
