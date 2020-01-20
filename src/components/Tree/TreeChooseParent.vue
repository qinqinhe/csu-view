<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      width="500px"
      :modal-append-to-body='false'
      class="dialog"
      @close="hideData()"
    >
      <div class="tree-box">
        <el-tree
          refs="tree"
          class="filter-tree"
          :data="dataTree"
          ref="tree"
          :default-expand-all='true'
          @node-click="treeChoose"
          :expand-on-click-node='TreeChooseType===0'
        />
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      dataTree: {
        type: Array,
        default: true
      },
      dataNative: {
        type: Array,
        default: true
      },
      visible: {
        type: Boolean
      },
      
      parentIds: {
        type: String
      },
      
      parentNames: {
        type: String
      },
      TreeChooseName: {
        type: String
      },
      
      id: {
        type: String
      },
      
      TreeChooseType: {
        type: Number
      }
      
      
      
    },
    data () {
      return {
        
        parentId: [],
        parentName: []
      }
    },
    methods: {
      treeChoose (item) {
        
        
        this.parentId = [item.id]
        this.parentName = [item.label]
        if (this.TreeChooseType === 0) {
          if (!item.children) {
            this.dataNativeSet(item.parentId)
            this.$emit('update:visible', false)
            this.$emit('update:parentIds', this.parentId.join())
            this.$emit('update:id', item.id)
            this.$emit('update:TreeChooseName', item.label)
            this.$emit('update:parentNames', this.parentName.reverse().join())
          }
        } else if (this.TreeChooseType === 1) {
        } else if (this.TreeChooseType === 2) {
          this.dataNativeSet(item.parentId)
          this.$emit('update:visible', false)
          this.$emit('update:parentIds', this.parentId.join())
          this.$emit('update:id', item.id)
          this.$emit('update:TreeChooseName', item.label)
          this.$emit('update:parentNames', this.parentName.reverse().join())
        }
      },
      dataNativeSet (parentId) {
        if (parentId !== '0') {
          for (let i = 0; i < this.dataNative.length - 1; i++) {
            const items = this.dataNative[i]
            if (items.id === parentId) {
              this.parentId.push(items.id)
              this.parentName.push(items.label)
              this.dataNativeSet(items.parentId)
            }
          }
        }
      },
      hideData () {
        console.log('hide')
        this.$emit('clickNodesCallBack')
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-dialog {
  }

  .tree-box {
    padding-left: 30px;
    flex: 1;
    overflow: hidden;
  }

</style>
