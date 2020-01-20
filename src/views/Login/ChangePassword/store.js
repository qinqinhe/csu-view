import store from './action'

export default {
  submit: async () => {
    await store.dispatch('ChangePassword')
  },
  userPwdVisibleUpdate (state) {
    store.commit('userPwdVisibleUpdate', state)
  },
  passwordVisibleUpdate (state) {
    store.commit('passwordVisibleUpdate', state)
  },
  passwordEnterVisibleUpdate (state) {
    store.commit('passwordEnterVisibleUpdate', state)
  }
}
