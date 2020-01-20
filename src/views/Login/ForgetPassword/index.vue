<template>
  <div class="h100 body-main">
    <main-header/>
    <main>
      <main-head/>
      <!-- <section class="content">
      </section> -->
      <from-content/>
    </main>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import action from './action'
  import MainHeader from '@/components/Header'
  import MainHead from './components/MainHeader'
  import FromContent from './components/FromContent'
  import store from './store'
  export default {
    data () {
      return {}
    },
    components: {
      MainHeader,
      MainHead,
      FromContent
    },
    mounted () {
      
    },
    computed: {
      
    },
    methods: {
      
    },
    watch: {}
  }
</script>
<style scoped lang='scss'>

  .body-main {
    background-color: #f1f2f7;
  }

  main {
    width: 1120px;
    
    background-color: #fdfdfd;
    margin: 26px auto 0;
    border-radius: 4px;
  }
</style>
