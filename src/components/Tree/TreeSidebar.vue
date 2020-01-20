<template>
  <section class="tree-ui" style="">
    <div class="tree-ui-title">
      <p>
        {{ title }}
      </p>
    </div>
    <section class="tree-main">
      <tree-item
        :treelist='list'
        :checkWay='checkWay'
      />
    </section>
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
      title: {
        default: ''
      },
      showCheckbox: {
        type: Boolean,
        default: true
      },
      checkWay: {
        type: Number, // 1单选 2多选
        default: 2
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
        'dataUpdate',
        'treelistUpdate',
        'showCheckboxSet',
        'treelistInitialization',
        'checkWayUpdate'
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
        parentCheck: state => state.tree.parentCheck,
        load: state => state.tree.load,
        currentItem: state => state.tree.currentItem
      })
    },
    mounted () {
      this.checkWayUpdate(this.checkWay)
      this.showCheckboxSet(this.showCheckbox)
    },
    watch: {
      'list': function (val) {
      },
      'treelist': function (val) {
        this.dataUpdate(JSON.parse(JSON.stringify(this.treelist)))
        this.treelistUpdate(JSON.parse(JSON.stringify(this.treelist)))
      },
      'halfCheck': function (val) {
        this.$emit('update:halfCheck', val)
      },
      'allCheck': function (val) {
        // this.$emit('update:allCheck', val)
      },
      'treeCheck': function (val) {
        this.load && this.$emit('update:treeCheck', val)
      },
      'childCheck': function (val) {
        // console.log('childCheck', val)
        // console.log('childCheck:',this.load, val)
        // this.load && this.$emit('update:childCheck', val)
      },
      'parentCheck': function (val) {
        this.$emit('update:parentCheck', val)
      },
      'load': function (val) {
        if (val) {
          this.$emit('update:childCheck', this.childCheck)
          this.$emit('update:allCheck', this.allCheck)
          this.$emit('change', {
            childCheck: this.childCheck,
            allCheck: this.allCheck,
            treeCheck: this.treeCheck,
            currentItem: this.currentItem
          })
        }
      }
      // 'checkWay': function (val) {
      //   console.log(val)
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .tree-ui {
    min-width: 180px;
    height: calc(100% - 40px);

    .tree-ui-title {
      height: 70px;
      border-bottom: #c5c8ce 1px solid;

      p {
        color: #17233d;
        text-indent: 20px;
        line-height: 70px;
        font-weight: bold;
      }
    }

    .tree-main {
      margin-top: 20px;
    }
  }
</style>



