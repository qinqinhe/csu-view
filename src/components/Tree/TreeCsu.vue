<template>
  <section>
    <tree-item
      :treelist='list'
    />
  </section>
</template>

<script>
  /*
  *
   check 0 未选中 1选中 2半选
  *
  */
  import TreeItem from './TreeItem'
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      treelist: {
        type: Array,
        default: []
      },
      defaultChecked: {
        type: Array,
        default: []
      }
    },
    components: {
      TreeItem
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions('tree', [
        'treelistUpdate',
        // 'currentDimensionUpdate',
        // 'halfCheckUpdate',
        // 'allCheckUpdate',
        'treelistInitialization'
      ])
    },
    computed: {
      ...mapState({
        list: state => state.tree.treelist,
        currentDimension: state => state.tree.currentDimension,
        halfCheck: state => state.tree.halfCheck,
        allCheck: state => state.tree.allCheck,
        treeCheck: state => state.tree.treeCheck,
        childCheck: state => state.tree.childCheck,
        parentCheck: state => state.tree.parentCheck
      })
    },
    mounted () {
    },
    watch: {
      'defaultChecked': function (val) {
        console.log(val)
      },
      // 'treelist': function (val) {
      //   console.log(val)
      //   this.treelistUpdate(this.treelist)
      // },
      'treelist': {
        handler (val) {
          console.log(val)
          this.treelistUpdate(this.treelist)
        },
        immediate: true,
        deep: true
      },
      'halfCheck': {
        handler (val) {
          console.log(val)
          // this.treelistUpdate(this.treelist)
        },
        immediate: true,
        deep: true
      },
      // 'halfCheck': function (val) {
      //   this.$emit('halfCheck', val)
      //   console.log(val)
      // },
      'allCheck': function (val) {
        this.$emit('allCheck', val)
      },
      'treeCheck': function (val) {
        this.$emit('treeCheck', val)
      },
      'childCheck': function (val) {
        this.$emit('childCheck', val)
      },
      'parentCheck': function (val) {
        this.$emit('parentCheck', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>



