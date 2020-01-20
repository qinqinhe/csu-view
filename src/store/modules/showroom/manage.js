export default {
  state: {
    AddVisible: false,
    importVisible: false
  },
  getters: {},
  mutations: {
    AddVisibleChange (state, val) {
      state.AddVisible = val
    },
    importVisibleChange (state, val) {
      state.importVisible = val
    }
  },
  actions: {}
}
