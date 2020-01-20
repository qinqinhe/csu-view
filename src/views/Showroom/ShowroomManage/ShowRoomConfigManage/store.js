export default {
  namespaced: true,
  state: {
    showRoom: []
  },
  getters: {
    
  },
  mutations: {
    showRoomChange (state, arr) {
      state.showRoom = arr
    }
  },
  actions: {
    showRoomchange ({ commit }, arr) {          
      commit('showRoomChange', arr)
      
    }
  }
}