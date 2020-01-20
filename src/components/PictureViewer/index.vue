<template>
  <Main :list='list' v-if='visible' @close='close' :currentIndex='currentIndex'/>
</template>
<script>
  import { local } from '@/config/wildcard'
  import Main from './main'

  export default {
    props: {
      zIndex: {
        type: Number,
        default: 1
      },
      list: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    components: {
      Main
    },
    methods: {
      close () {
        this.$emit('close', false)
      }
    }
  }
</script>
