<template>
  <section class="breadcrumb">
    <ul v-if='this.customize.length'>
      <li v-for='(item, index) in list' :key='index'>
        <span v-if='index!==0' class="separator">/</span>
        <span v-if='index !== list.length-1' @click='item.junp()' class="pointer">{{ item.text }}</span>
        <span class='current' v-else>{{ item.text }}</span>
      </li>
    </ul>
    <ul v-else>
      <li v-for='(item, index) in list' :key='index'>
        <span v-if='index!==0' class="separator">/</span>
        <router-link :to='item.route' v-if='index !== list.length-1' :key='index'>{{ item.text }}</router-link>
        <span class='current' v-else>{{ item.text }}</span>
      </li>
    </ul>
  </section>
</template>
<script>
  import { local } from '@/config/wildcard'

  export default {
    props: {
      customize: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        list: [
          { route: '/Home', text: '首页' }
        ]

      }
    },
    methods: {},
    computed: {},
    mounted () {
      if (this.customize.length) {
        this.list = this.customize
        console.log(this.list)
      } else {
        const menu = JSON.parse(localStorage.getItem(local.MENU))
        const route = this.$route.matched
        for (let i = 1; i < route.length; i++) {
          const item = route[i]
          const menuItem = menu.filter(items => items.menuInfoId === item.name)[0]
          this.list.push({ route: item.path, text: menuItem.menuName })
        }
      }
      // this.list = [...this.list,...this.supplement]
    },
    watch: {}
  }
</script>


<style lang="scss" scoped>
  .breadcrumb {
    font-size: 16px;
    background-color: #f5f7f9;

    ul {
      // display: flex;

      li {
        color: #808695;
        float: left;

        .separator {
          margin: 0 .5em;
        }

        a {
          &:hover {
            color: #17233d;
          }
        }

        .current {
          // font-weight: 600;
          color: #17233d;
        }

        .pointer {
          cursor: pointer;

          &:hover {
            color: #17233d;
          }
        }
      }
    }
  }
</style>



