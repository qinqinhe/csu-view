<template>
  <div id="app">
    <section class="loading" v-if='loading'/>
    <router-view/>
  </div>
</template>

<script>
import { local } from '@/config/wildcard'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      addr: window.location.origin + '/Login'
    }
  },
  beforeCreate () {
    
      
      
      
    
  },
  mounted () {
    const token = localStorage.getItem(local.TOKEN)
    const route = localStorage.getItem(local.ROUTE)
    const user = localStorage.getItem(local.USER)
    const routeAddr = window.location.pathname
    
    if (token && route && user || (routeAddr==='/Login')) {
      
    } else {
      this.$router.push({ path: '/Login' })
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  }
}
</script>

<style>
@import "./assets/css/style.css";
#app {
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;  
  font-family: '微软雅黑';
}
textarea{
  font-family: '微软雅黑';
}
a{
  color: inherit;
}
.wi{
  width: 100%;
}
.he{
  height: 100%;
}
*{padding: 0; margin: 0;}
input::-webkit-inner-spin-button {
   -webkit-appearance: none;
}
::-webkit-scrollbar{
  width: 5px;
  height: 8px;
  background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: rgba(160,160,160,.6);
}
.loading{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  /* background-color: rgba(0, 0, 0, 1) */
}
</style>
