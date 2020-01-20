export default {
  namespaced: true,
  state: {
    faculty: []

  },
  getters: {},
  mutations: {
    facultyChange (state, arr) {
      state.faculty = arr
    }
  },
  actions: {
    facultyChange ({ commit }, arr) {
      commit('facultyChange', arr)
    }
  }
}
