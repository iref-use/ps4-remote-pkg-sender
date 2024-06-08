import { make } from 'vuex-pathify'

export const state = {
    queue: [],
    tasks: [],
    installed: [],
    logs: [],
}


// make all mutations
export const mutations = {
    ...make.mutations(state),

    resetAll(state){
        state.queue = []
        state.tasks = []
        state.installed = []
        state.logs  = []
    },

    toQueue(state, file){
        state.queue.push(file)
    },

    removeQueue(state, file){
        state.queue = state.queue.filter( x => x.name != file.name)
    },

    toInstalled(state, file){
        state.installed.push(file)
    },

    status(state, { file, status }){
        let i  = state.queue.findIndex( x => x.name == file.name)
        state.queue[i].status = status
    },

    task(state, { file, id }){
        let i  = state.queue.findIndex( x => x.name == file.name)
        state.queue[i].task = id
    },

    addLog(state, log){
        state.logs.unshift(log)
    },

    addTask(state, task){
        state.tasks.push(task)
    },
}

// actions
export const actions = {
    ...make.actions(state),

    resetAll({ commit }){
        commit('resetAll')
    },

    addToQueue({ commit }, file){
        commit('toQueue', file)
    },

    removeFromQueue({ commit }, file){
        commit('removeQueue', file)
    },

    installed({ commit, state }, file){
        let i = state.installed.findIndex( x => x.name == file.name)
        console.log(file.name + ' installed. lets check file at pos '+ i)

        // file not installed yet
        if(i == -1){
          commit('toInstalled', file)
          // commit('installed', [...state.installed, file])
        }
        // file exists in installed
        else {
          console.log(file.name + ' is already installed')
          state.installed[i].status = 'installed +'
        }
    },

    status({ commit }, data){
        commit('status', data)
    },

    task({ commit }, data){
        commit('task', data)
    },

    addLog({ commit }, log){
        commit('addLog', log)
    },

    addTask({ commit }, task){
        commit('addTask', task)
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
    // return state.queue.find( x => x.name == file.name)
    return state.queue.find( x => x.path == file.path)
  },

  isInQueueUnique: (state) => (file) => {
    return state.queue.find( x => x.path == file.path)
  },

  isInstalled: (state) => (file) => {
    return state.installed.find( x => x.path == file.path)
  }

  // overwrite default `items` getter
  // allFiles: state => {
  //     return state.images
  // },
}
