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
    },

    toQueue(state, file){
        state.queue.push(file)
    },
}

// actions
export const actions = {
    ...make.actions(state),

    reset({ commit }){
        commit('reset')
    },

    addToQueue({ commit }, file){
        commit('toQueue', file)
    },

    // addFiles({ commit, dispatch, state}, payload){
    //     commit('addFiles', payload)
    // }
}

// getters
export const getters = {
  // make all getters (optional)
  ...make.getters(state),

  isInQueue: (state) => (file) => {
    return state.queue.find( x => x.name == file.name)
  }

  // overwrite default `items` getter
  // allFiles: state => {
  //     return state.images
  // },
}
