
import Vue from 'vue'
import vuex from 'vuex'
import webapi from '@/api/http'
Vue.use(vuex)

export default new vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    async info () {      
      await webapi({
        baseURL: 'http://27.8.47.252:8093/#/page',
        
        methods: 'POST',
        data: {
          guid: '66525eddebb94ff48bd22651c2a6b114' 
        }
      })
      
    }
  }
})