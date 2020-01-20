import store from './action'

export default {
  info: async () => {
    await store.dispatch('conditionsFormRuleFormDateSet')
    await store.dispatch('conditionsPeriodResponse')
    await store.dispatch('place')
    await store.dispatch('inquiry')
    await store.dispatch('students')
    await store.dispatch('laboratoryTypeSet')
  },
  paginationCurrentChange: () => {
    store.dispatch('paginationCurrentChange')
  },
  paginationSizeChange: () => {
    store.dispatch('paginationSizeChange')
  },
  checkChange: (checKChild) => {
    store.dispatch('checkChange', checKChild)
  },
  inquiry: () => {
    store.dispatch('inquiry')
  },
  detail: () => {
    store.commit('videoListVidibleUpdate', true)
  },
  videoListVidibleUpdate: (sta) => {
    store.commit('videoListVidibleUpdate', sta)
  },
  detailVisibleUpdate: (sta) => {
    
    store.commit('detailVisibleUpdate', sta)
  }
}
