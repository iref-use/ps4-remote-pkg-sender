import { make } from 'vuex-pathify'

export const state = {
    queue: [],
    tasks: [],
    logs: [],
}


// make all mutations
export const mutations = {
    ...make.mutations(state),

    reset(state){
        state.queue = []
        state.tasks = []
        state.logs  = []
    }
}

// actions
export const actions = {
    ...make.actions(state),

    reset({ commit }){
        commit('reset')
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
