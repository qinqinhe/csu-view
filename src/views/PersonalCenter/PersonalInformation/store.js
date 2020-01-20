import store from './action';
export default {
  inquire: async () => {
    await store.dispatch('inquire')
  }
}