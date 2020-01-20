export default {
  namespaced: true,
  state: {
    role: [],
    userType: []
  },
  getters: {},
  mutations: {
    roleChange (state, array) {
      state.role = array
    },
    userTypeChange (state, array) {
      state.userType = array
    }
  },
  actions: {
    rolechange ({ commit }, arr) {
      commit('roleChange', arr.map(item => {
        item.id = item.roleInfoId
        item.label = item.roleName
        return item
      }))
    },
    userTypeChange ({ commit }, array) {
      commit('userTypeChange', array)
    }
  }
}
