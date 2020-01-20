export default {
  namespaced: true,
  state: {
    permissionNative: [],
    permissionVisible: false,
    permissionFitter: [],
    department: [],
    departmentFitter: [],
    placeAll: [],
    placeFitterSet: []
  },
  getters: {},
  mutations: {
    permissionNativeChange (state, arr) {
      state.permissionNative = arr
    },
    permissionVisibleChange (state, val) {
      state.permissionVisible = val
    },
    permissionFitterSet (state, arr) {
      state.permissionFitter = arr
    },
    departmentChange (state, arr) {
      state.department = arr
    },
    departmentFitterSet (state, arr) {
      state.departmentFitter = arr
    },
    placeAllChange (state, arr) {
      state.placeAll = arr
    },
    placeFitterSet (state, arr) {
      state.placeFitter = arr
    }
  },
  actions: {
    permissionNativeChange ({ commit }, val) {
      commit('permissionNativeChange', val)
    },
    permissionVisibleChange ({ commit }, val) {
      commit('permissionVisibleChange', val)
    },
    permissionFitterSet ({ commit }, arr) {
      commit('permissionFitterSet', arr)
    },
    departmentChange ({ commit }, arr) {
      commit('departmentChange', arr)
    },
    departmentFitterSet ({ commit }, arr) {
      commit('departmentFitterSet', arr)
    },
    placeAllChange ({ commit }, arr) {
      commit('placeAllChange', arr)
    },
    placeFitterSet ({ commit }, arr) {
      commit('placeFitterSet', arr)
    }
  }
}
