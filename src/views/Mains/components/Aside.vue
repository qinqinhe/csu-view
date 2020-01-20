<template>
  <div id="main-aside">
    <menu class="menu-data-v-68096507" v-if='list.length'>
      <el-menu
        :default-active="checkItem"
        class="el-menu-vertical-demo"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item
          v-for='(item,index) in list[0].children'
          :key='index'
          v-if='!item.children'
          :index="item.path"
        >
          <router-link :to='"/" + oneLevelRoute + "/" + item.path'>
            <p>{{ item.menuName }}</p>
          </router-link>
        </el-menu-item>
        <el-submenu
          :index="item.path"
          :key='index'
          v-else
        >
          <template slot="title">
            <p class="title">{{ item.menuName }}</p>
          </template>
          <el-menu-item :index="items.path" v-for='(items,indexs) in item.children' :key="index + '-' + indexs">
            <router-link :to='"/" + oneLevelRoute + "/" + item.path + "/" +items.path'>
              <p>{{ items.menuName }}</p>
            </router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </menu>
  </div>
</template>
<script>
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {
        header: ''
      }
    },
    computed: {
      list () {
        const list = []
        const routePath = this.$route.matched[1].path
        const route = JSON.parse(localStorage.getItem(local.ROUTEMATCH))
        for (let i = 0; i < route.length; i++) {
          const item = route[i]
          const path = item.path
          if (routePath === path) {
            list.push(item)
            break
          }
        }
        return list
      },
      fullPath () {
        return this.$route.fullPath.split('/')
      },
      checkItem () {
        return this.fullPath[this.fullPath.length - 1]
      },
      oneLevelRoute () {
        return this.fullPath[1]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-menu {
    border-right: none;
  }

  #main-aside {
    overflow-y: auto;
    overflow-X: hidden;
    height: 100%;
    padding-right: 5px;
    width: 100%;
  }

  .el-submenu {
    
    
  }

  .el-menu-item.is-active, .el-menu-item:hover, .el-submenu__title:hover {
    background-color: rgba(30, 46, 82, .4) !important;
  }

  .el-submenu {
    
  }

  .el-submenu__title {
    padding: 0 !important;

  }

  .el-menu-item-group__title {
    padding: 0 12px;
  }

  .el-menu-item {
    padding: 0 12px !important;
  }

  .el-menu--inline {
    
    text-indent: 12px;
  }

  #main-aside .title {
    
    
    width: 100%;
    padding: 0 12px;
    
    color: #fff;
  }

  .el-submenu__title i {
    color: #fff;
  }
</style>
