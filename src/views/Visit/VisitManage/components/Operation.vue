<template>
  <div class="operation">
    <el-button type="primary" size="mini" @click='AddVisibleChange(true)'>新增</el-button>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { code } from '@/config/wildcard'

  export default {
    props: {
      info: {
        type: Function
      }
    },
    data () {
      return {}
    },
    watch: {},
    methods: {
      ...mapMutations([
        
        'AddVisibleChange'
      ])
    },
    computed: {
      ...mapState({
        tableCheck: (state) => state.tableCheck
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
