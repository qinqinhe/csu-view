export default {
  state: {
    user: [],
    laboratory: []
  },
  getters: {},
  methods: {},
  mutations: {
    userChange (state, arr) {
      state.user = arr
      
    },
    laboratorySet (state, arr) {
      state.laboratory = arr
    }
  },
  actions: {}
}
