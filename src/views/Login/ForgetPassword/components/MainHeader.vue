<template>
  <div class="main-header">
    忘记密码
  </div>
</template>

<script>
  import { code, local } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'
  import action from '../action'
  import store from '../store'
  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    mounted () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-header {
    height: 70px;
    border: solid 1px #f1f2f7;
    font-size: 24px;
    text-align: center;
    line-height: 70px;
  }
</style>
