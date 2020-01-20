export default {
  namespaced: true,
  state: {
    laboratory: []
  },
  getters: {},
  mutations: {
    laboratoryChange (state, arr) {
      state.laboratory = arr
    }
  },
  actions: {
    laboratorychange ({ commit }, arr) {
      commit('laboratoryChange', arr)
      
    }
  }
}
