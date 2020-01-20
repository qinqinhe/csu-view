<template>
  <div id="Main">
    <el-container>
      <el-header height='75px'>
        <main-header/>
      </el-header>
      <el-container class='container'>
        <el-aside width="200px">
          <main-aside/>
        </el-aside>
        <el-container class="container-main">
          <!-- <el-header height='84px'>
              <Nav/>
          </el-header> -->
          <el-main class="h100">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import MainHeader from '@/components/Header'
  import MainAside from './components/Aside'
  import Nav from './components/Nav'
  import { local } from '@/config/wildcard'

  export default {
    name: 'Main',
    components: {
      MainHeader,
      MainAside,
      Nav
    },
    data () {
      return {}
    },
    mounted () {

    },
    beforeMount () {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-header {
    padding: 0;
    
    
  }

  .container {
    position: fixed;
    top: 75px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .el-aside {
    background-image: url('~@/assets/images/main/aside.png');
    overflow: hidden;
    position: fixed;
    top: 74px;
    left: 0;
    bottom: 0;
  }

  .container-main {
    position: fixed;
    top: 75px;
    left: 200px;
    bottom: 0;
    right: 0;
    
  }

  .el-main {
    
    padding: 0;
    
    background: #f5f7f9;
    overflow: hidden;
    
  }
</style>
