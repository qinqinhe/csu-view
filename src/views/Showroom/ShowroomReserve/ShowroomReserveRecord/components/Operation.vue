<template>
  <div class="operation">
    <el-button type="danger" size="mini" @click='delDateBatch'>批量删除</el-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { code } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {}
    },
    watch: {},
    methods: {
      ...mapActions('showroomReserveRecord', [
        'delDateBatch'
      ])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
