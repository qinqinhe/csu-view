<template>
  <section class="treeUI posi-re" :style="{ 'min-width': !toggle ? '20px' : '200px' }">
		<span class="shrink" @click="toggleClick">
			<i class="el-icon-arrow-left fwhite"/>
		</span>
    <transition>
      <div :style="{ 'width': !toggle ? '0' : '200px' ,height: '100%'}">
        <div class="trees-title-div">
          <span class="tree-title">{{treesTitle}}</span>
        </div>
        <div class="tree">
          <el-tree
            ref='tree'
            class="padL15P padT15P"
            :data="contentTrees"
            :props="defaultProps"
            @check='checkChange'
            :expand-on-click-node='clickType'
            node-key="id"
            :show-checkbox='Optional'
          />
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    props: {
      treesTitle: [String],
      contentTrees: [Array],
      dataNative: Array,
      // 0 不可关闭 1可关闭
      clickType: {
        type: Boolean,
        default: true
      },
      // 可选true 不可选false
      Optional: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        parentId: [],
        parentNames: [],
        toggle: true
      }
    },
    methods: {
      tapClick (data) {
        if (data) {
          this.parentId = [data.id]
          this.parentNames = [data.label]
          this.dataNative && this.dataNativeSet(data.parentId)
        } else {
          this.parentId = []
          this.parentNames = []
        }
        if (this.dataNative) {
          this.$emit('update:parentIds', this.parentId.join())
          this.$emit('update:parentNames', this.parentNames.reverse().join())
        }
        this.dataNative && this.$emit('headCallBack', data)
      },
      dataNativeSet (parentId) {
        if (parentId !== '0') {
          for (let i = 0; i < this.dataNative.length - 1; i++) {
            const items = this.dataNative[i]
            if (items.id === parentId) {
              this.parentId.push(items.id)
              this.parentNames.push(items.label)
              this.dataNativeSet(items.parentId)
            }
          }
        }
      },
      Keysclear () {
        this.$refs.tree.setCheckedKeys([])
        this.tapClick()
      },
      checkChange (data, checked) {
        checked.checkedNodes.length && this.$refs.tree.setCheckedNodes([data])
        this.tapClick(data)
      },
      toggleClick () {
        this.toggle = !this.toggle
      }
    }
  }
</script>

<style lang="scss" scoped>
  .treeUI {
    // height: calc(100% - 40px);
    transition-duration: 0.2s;
    background-color: #fff;
    padding: 20px;
    margin-right: 20px;
    border-radius: 10px;
  }

  .trees-title-div {
    height: 20px;
    overflow: hidden;
  }

  .tree-title {
    height: 20px;
  }

  .tree {
    // height: calc(100% - 20px);
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
