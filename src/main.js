



import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'
import store from './store'
import webapi from '@/api/webapi'
import Breadcrumb from '@/components/Breadcrumb'
import PictureViewer from '@/components/PictureViewer'



Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.prototype.webapi = webapi
Vue.prototype.$webapi = webapi
Vue.component('Breadcrumb',Breadcrumb)
Vue.component('PictureViewer',PictureViewer)
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App,
    
  },
  template: '<App/>'
})
