export default {
  namespaced: true,
  state: {
    meetingRoom: []
  },
  getters: {
    
  },
  mutations: {
    meetingRoomChange (state, arr) {
      state.meetingRoom = arr
    }
  },
  actions: {
    meetingRoomchange ({ commit }, arr) {          
      commit('meetingRoomChange', arr)
    }
  }
}