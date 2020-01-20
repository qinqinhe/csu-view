<template>
  <section>
    <ul class="tree">
      <li v-for='(item,index) in treelist' :key='item.id' class="tree-item">
        <div class="tree-node">
          <span
            v-if='item.children&&item.children.length'
            @click='nodeClick(index,item.id)'
            class="el-icon-caret el-icon-caret-right"
            :class='{treeRotate: item.switch}'
          />
          <span v-else class="el-icon-caret"/>
          <label class="tree-checkbox" @click='check(item)' v-if='showCheckbox'>
            <span class="tree-checkbox-input">
              <span class="tree-checkbox-inner el-icon-check" v-if='item.check===1'/>
              <span class="tree-checkbox-inner el-icon-minus" v-else-if='item.check===2'/>
              <span class="tree-checkbox-inner" v-else/>
              <input type="checkbox" class="tree-checkbox-original"/>
            </span>
          </label>
          <span class="tree-node-label" @click='nodeClick(index,item.id)'>{{ item.label }}</span>
        </div>
        <div
          class="tree-group"
          :id='item.id'
          v-if='item.children&&item.children.length'
          :class='{treeGroupHidden: !item.switch}'
          :ref='item.id'
        >
          <TreeItem
            :treelist='item.children'
          />
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  //check 0 未选中 1选中 2半选
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'TreeItem',
    props: {
      treelist: {
        type: Array,
        default: []
      }
      // checkWay: {
      //   type: Number, // 1单选 2多选
      //   default: 2
      // }
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions('tree', [
        // 'treelistUpdate',
        'currentDimensionUpdate',
        'halfCheckUpdate',
        'allCheckUpdate',
        'treelistInitialization',
        'treeCheckUpdate',
        'childCheckUpdate',
        'parentCheckUpdate',
        'findCheck',
        'loadUpdate',
        'currentItemUpdate'
      ]),
      nodeClick (index, id) {
        if (this.treelist[index].switch) {
          this.$set(this.treelist[index], 'switch', 0)
        } else {
          this.$set(this.treelist[index], 'switch', 1)
        }
      },
      async check (item) {
        this.loadUpdate(false)
        if (this.checkWay === 1 && (JSON.stringify(this.currentItem) != JSON.stringify(item))) {
          // console.log('update')
          this.dataUpdate(this.list)
        }
        if (item.check === 1) {
          await this.$set(item, 'check', 0)
          this.currentItemUpdate('')
        } else {
          await this.$set(item, 'check', 1)
          this.currentItemUpdate(item)
        }
        await this.setchildren(item)
        await this.findCheck(this.list)
        this.loadUpdate(true)
      },
      async setchildren (item) {
        await this.allCheckUpdate([])
        await this.halfCheckUpdate([])
        await this.childCheckUpdate([])
        await this.treeCheckUpdate([])
        await this.parentCheckUpdate([])
        if (item.children && item.children.length) {
          await this.findchildren(item)
        }
        await this.currentDimensionUpdate(0)
        await this.findParents(this.list, item)
      },
      async findchildren (item) {
        const _this = this
        await item.children.forEach(async itemchildren => {
          await this.$set(itemchildren, 'check', item.check)
          if (itemchildren.children && itemchildren.children.length) {
            await this.findchildren(itemchildren)
          }
        })
      },
      async findParents (list, item) {
        for (let i = 0; i < list.length; i++) {
          const itemchildren = list[i]
          if (itemchildren.children) {
            const every = itemchildren.children.every(itemEvery => itemEvery.check === 1)
            const some = itemchildren.children.some(itemSome => itemSome.check === 1 || itemSome.check === 2)
            const someId = itemchildren.children.some(itemSome => itemSome.id === item.id)
            if (every) {
              await this.$set(itemchildren, 'check', 1)
            } else if (some) {
              await this.$set(itemchildren, 'check', 2)
            } else {
              await this.$set(itemchildren, 'check', 0)
            }
            if (someId) {
              if (this.currentDimension === 0) {
              } else {
                await this.currentDimensionUpdate(0)
                await this.findParents(this.list, itemchildren)
              }
              break
            } else {
              i === 0 && await this.currentDimensionUpdate(this.currentDimension + 1)
              itemchildren.children && await this.findParents(itemchildren.children, item)
            }
          }
        }
      },
      dataUpdate (list) {
        const _this = this
        list.forEach(item => {
          this.$set(item, 'check', 0)
          if (item.children && item.children.length) {
            _this.dataUpdate(item.children)
          }
        })
      }
    },
    computed: {
      ...mapState({
        data: state => state.tree.data,
        list: state => state.tree.treelist,
        currentDimension: state => state.tree.currentDimension,
        halfCheck: state => state.tree.halfCheck,
        allCheck: state => state.tree.allCheck,
        treeCheck: state => state.tree.treeCheck,
        childCheck: state => state.tree.childCheck,
        parentCheck: state => state.tree.parentCheck,
        showCheckbox: state => state.tree.showCheckbox,
        checkWay: state => state.tree.checkWay,
        currentItem: state => state.tree.currentItem
      })
    },
    mounted () {
    },
    watch: {
      'allCheck': function (val) {
      },
      'halfCheck': function (val) {
      },
      list: function (val) {
      }
    }
  }
</script>


<style lang="scss">
  .tree {
    padding-left: 15px;

    .tree-item {
      transition-duration: 1s;
      // padding-right: 20px;
      .tree-node {
        height: 26px;
        // display: flex;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;

        .el-icon-caret {
          padding: 2px;
          transition-duration: .1s;
          transform: rotate(0deg);
          cursor: pointer;
          font-size: 12px;
          width: 12px;
          height: 12px;
          // display: block;
          // float: left;
        }

        .el-icon-caret-right {
          color: #C0C4CC;

          &before {
            content: "\E791",
          }
        }

        .treeRotate {
          transform: rotate(90deg);
        }

        .tree-checkbox {
          margin-right: 4px;
          padding-top: 6px;
          // float: left;
          display: inline-block;
          .tree-checkbox-input {
            position: relative;
            display: block;

            .tree-checkbox-inner {
              display: block;
              width: 12px;
              height: 12px;
              border: 1px solid #cccccc;
              border-radius: 2px;
            }

            .el-icon-check {
              background-color: #374a6d;
              border-color: #374a6d;
              color: #fff;
              font-size: 12px;
            }

            .el-icon-minus {
              background-color: #374a6d;
              border-color: #374a6d;
              color: #fff;
              font-size: 12px;
            }

            .tree-checkbox-original {
              width: 14px;
              height: 14px;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
            }
          }
        }

        .tree-node-label {
          font-size: 14px;
          line-height: 26px;
          color: #17233d;
          padding-right: 20px;
          // display: block;
          // float: left;
        }
      }

      .tree-group {
        height: auto;
        overflow: hidden;
        transition-duration: 1s;
      }

      .treeGroupHidden {
        height: 0px;
      }
    }
  }
</style>



