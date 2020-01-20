export default {
  state: {
    AddVisible: false,
    EditVisible: false,
    tableCheck: [],
    loading: true
  },
  getters: {},
  mutations: {
    
    AddVisibleChange (state, val) {
      state.AddVisible = val
    },
    
    EditVisibleChange (state, val) {
      state.EditVisible = val
    },
    tableCheckChange (state, val) {
      state.tableCheck = val
    }

  },
  actions: {}
}
