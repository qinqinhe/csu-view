import store from './action'

export default {
  submit: async () => {
    await store.dispatch('reset')
  },
  securityCodeChange: async (val)=> {
    // console.log(val)
    await store.dispatch('securityCodeChange', val)
  },
  securitystatusUpdate: async (state) => {
    await store.dispatch('securitystatusUpdate', state)
  }
}
