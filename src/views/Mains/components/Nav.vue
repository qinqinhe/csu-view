<template>
  <nav>
    <section class="nav-bar">
      <img src='@/assets/images/main/menu.png' class="menuIcon"/>
    </section>
  </nav>
</template>

<script>
  import { local } from '@/config/wildcard'

  export default {
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
  nav {
    height: 84px;
    background-color: #fff;

    .nav-bar {
      height: 50px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

      .menuIcon {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
