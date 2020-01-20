<template>
  <main>
    <header class="flex">
      <div class="logo">
        <i class="iconfont iconlogo"></i>
      </div>
      <p class="name">全域安全物联网大数据管理系统</p>
      <nav>
          <ul class="flex">
            <li v-for="(item, index) in list" :key='index' :class="{home:index === 0}">
              <router-link :to='item.route'>
                {{ item.title }}
              </router-link>
            </li>
          </ul>
      </nav>
    </header>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="200" height="200" style="user-select: none; position: absolute; left: 0px; top: 0px;"><path d="M 52.0742 160.5 L 160 160.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 140.5 L 160 140.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 120.5 L 160 120.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 100.5 L 160 100.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 80.5 L 160 80.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 60.5 L 160 60.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 40.5 L 160 40.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 20.5 L 160 20.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.5 20 L 52.5 160" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.5 20 L 52.5 160" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="2,2" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.5 160 L 52.5 20" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><text dominant-baseline="ideographic" alignment-baseline="ideographic" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,52.07421875,5)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="ideographic" alignment-baseline="ideographic" text-anchor="middle" x="0" y="0">2</tspan></text><path d="M 160.5 160 L 160.5 20" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.0742 160.5 L 160 160.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,175,160)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="start" x="0" y="0">时间</tspan></text><path d="M 52.5 160 L 52.5 165" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 52.5 160 L 52.5 165" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,160)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">0</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,140)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">5</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,120)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">10</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,100)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">15</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,80)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">20</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,60)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">25</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,40)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">30</tspan></text><text dominant-baseline="middle" alignment-baseline="middle" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,44.07421875,20)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="middle" alignment-baseline="middle" text-anchor="end" x="0" y="0">35</tspan></text><text dominant-baseline="hanging" alignment-baseline="hanging" x="0" y="0" fill="#333" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,58.819580078125,168)" clip-path="none" style="font: 12px &quot;Microsoft YaHei&quot;;"><tspan dominant-baseline="hanging" alignment-baseline="hanging" text-anchor="middle" x="0" y="0">2019-11-19 03:37</tspan></text><path d="M 57.8196 32 L 59.8196 32 L 59.8196 160 L 57.8196 160 L 57.8196 32 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 71.3103 44 L 73.3103 44 L 73.3103 160 L 71.3103 160 L 71.3103 44 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 84.801 156 L 86.801 156 L 86.801 160 L 84.801 160 L 84.801 156 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 98.2917 156 L 100.2917 156 L 100.2917 160 L 98.2917 160 L 98.2917 156 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 111.7825 156 L 113.7825 156 L 113.7825 160 L 111.7825 160 L 111.7825 156 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 125.2732 48 L 127.2732 48 L 127.2732 160 L 125.2732 160 L 125.2732 48 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 138.7639 156 L 140.7639 156 L 140.7639 160 L 138.7639 160 L 138.7639 156 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path><path d="M 152.2546 40 L 154.2546 40 L 154.2546 160 L 152.2546 160 L 152.2546 40 Z" fill="#c23531" fill-opacity="1" stroke="none" clip-path="none"></path></svg> -->
    <!-- <div ref="iframe">
      <iframe src="http://27.8.47.252:8093/#/page/?guid=66525eddebb94ff48bd22651c2a6b114"></iframe>
    </div> -->
    <section class="statistics-ri">
      <section class="statistics">
        <section class="statistics-bg flex">
          <img src="@/assets/images/roleHome/statistics-vertical-top.png" class="bg-top" />
          <img src="@/assets/images/roleHome/statistics-vertical-center.png" class="bg-center" />
          <img src="@/assets/images/roleHome/statistics-vertical-bottom.png" class="bg-bottom" />
        </section>
      </section>
      <section class="statistics">
        <section class="statistics-bg flex">
          <img src="@/assets/images/roleHome/statistics-vertical-top.png" class="bg-top" />
          <img src="@/assets/images/roleHome/statistics-vertical-center.png" class="bg-center" />
          <img src="@/assets/images/roleHome/statistics-vertical-bottom.png" class="bg-bottom" />
        </section>
      </section>
      <section class="statistics">
        <section class="statistics-bg flex">
          <img src="@/assets/images/roleHome/statistics-vertical-top.png" class="bg-top" />
          <img src="@/assets/images/roleHome/statistics-vertical-center.png" class="bg-center" />
          <img src="@/assets/images/roleHome/statistics-vertical-bottom.png" class="bg-bottom" />
        </section>
      </section>
    </section>
    <section class="statistics-bottom flex">
      <section class="statistics">
        <section class="statistics-bg flex">
          <img src="@/assets/images/roleHome/statistics-horizontal-left.png" class="bg-left" />
          <img src="@/assets/images/roleHome/statistics-horizontal-center.png" class="bg-center" />
          <img src="@/assets/images/roleHome/statistics-horizontal-right.png" class="bg-right" />
        </section>
      </section>
      <section class="statistics">
        <section class="statistics-bg flex">
          <img src="@/assets/images/roleHome/statistics-horizontal-left.png" class="bg-left" />
          <img src="@/assets/images/roleHome/statistics-horizontal-center.png" class="bg-center" />
          <img src="@/assets/images/roleHome/statistics-horizontal-right.png" class="bg-right" />
        </section>
      </section>
    </section>
  </main>
</template>
<script>
import { local } from '@/config/wildcard'
import store from './store.js'
export default {
  name: 'control',
  data () {
    return {
      list: [{
        route: '/Control',
        title: '首页'
      }]
    }
  },
  beforeMount () {
    const route = JSON.parse(localStorage.getItem(local.ROUTE)) || []
    const list = route.map(item => {
      return {
        route: item.menuRoute,
        title: item.menuName
      }
    })
    this.list = [
      this.list[0],
      ...list
      ]
    
    
  },
  mounted () {
    
    
    
    
      
    //
    
  },

}
</script>

<style scoped lang='scss'>
header{
  height: 78px;
  
  color: #aacaf4;
  align-items: center;
  .logo{
    margin-left: 20px;
    i{
      font-size: 30px;
    }
  }
  .name{
    font-size: 20px;
    margin-right: 30px;
    margin-left: 15px;
  }
  nav{
    font-size: 16px;
    ul{
      li{
        margin: 0 10px;
        &:hover{
          color: #fff;
          text-shadow: 0 0 6px #fff;
        }
      }
      .home{
        color: #fff;
        text-shadow: 0 0 6px #fff;
      }
    }
  }
}
.statistics-ri{
  position: fixed;
  top: 20px;
  right: 10px;
  bottom: 10px;
  .statistics{
    width: 398px;
    height: 32%;
    margin-bottom: 3%;
    
    position: relative;
    .statistics-bg{
      position: relative;
      z-index: -1;
      width: 100%;
      height: 100%;
      flex-direction: column;
      img{
        display: block;
      }
      .bg-top,.bg-bottom, .bg-center{
        width: 100%;
      }
      .bg-top{
        height: 43.6%;
      }
      .bg-bottom{
        height: 30.79%;
      }
      .bg-center{
        flex: 1;
      }
    }
  }
}
.statistics-bottom{
  position: fixed;
  height: 328px;
  right: 408px;
  bottom: 24px;
  left: 28px;
  .statistics{
    width: 49%;
    height: 100%;
    margin-right: 1%;
    
    .statistics-bg{
      img{
        display: block;
      }
      .bg-center{
        flex: 1;
      }
    }
  }
}
</style>