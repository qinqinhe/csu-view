<template>
  <div id="Home">
    <div class="w100 h100 home">
      <nav>
        <div class="logo"><img src="../assets/images/logo2.png"/></div>
        <div class="operation">
          <span class="self">
            <router-link to='/PersonalCenter/PersonalInformation'>
              <i class="iconfont icongerenzhongxin1"/>
              {{userName}}
            </router-link>
          </span>
          <span class="sign-out" @click='signOut'>
						<i class="iconfont icontuichu"/>
						退出
					</span>
        </div>
      </nav>
      <header class="header">
        <span>全域安全物联网大数据管理系统</span>
      </header>
      <section class="content">
        <div class="center">
          <section class="swiper">
            <section class="swiper-main">              
              <section
                class="swiper-list"
                :style="{width: list.length > 5 ? (100 * Math.ceil(list.length/5) +'%') : (100 * (list.length/5) + '%'),
                        margin: list.length > 5 ? '0' : '0 auto',
                        marginLeft: list.length > 5 ? (-swiperItem * 100 + '%') : 'auto' }"
                >
                <div
                    class="swiper-slide"
                    v-for="(item,index) in list"
                    :key="index"
                    :style="{width: list.length >= 5 ? (100 / (Math.ceil(list.length/5)*5) +'%') : (100 * (list.length/5) + '%')}"
                  >
                    <router-link :to='{path: item.route}'>
                      <div class="swiper-slide-div"
                        :class="{bg1:index%3===0,bg2:index%3===1,bg3:index%3===2}"
                      >
                        <i class="iconfont" :class="item.icon" ></i>
                      </div>
                      <span class="swiper-slide-title">{{ item.title }}</span>
                    </router-link>
                  </div>
              </section>
            </section>
            <ul class="swiper-scroll" v-if='list.length > 5'>
              <li v-for="(item,index) in Math.ceil(list.length/5)" :key="item" :class="{swiperScrollCheck: swiperItem === index}" @click="swiperChange({index, listLen: Math.ceil(list.length/5)})"></li>
            </ul>
            <article class="swiper-opration">
              <div class="swiper-opration-pre" @click="swiperChange({index: swiperItem-1, listLen: Math.ceil(list.length/5)})" v-if='swiperItem!==0 && list.length > 5'>
                <i class="iconfont iconzu"></i>
              </div>
              <div class="swiper-opration-next" @click="swiperChange({index:swiperItem+1, listLen: Math.ceil(list.length/5)})" v-if='swiperItem!== Math.ceil(list.length/5) - 1 && list.length > 5'>
                <i class="iconfont iconzu1"></i>
              </div>
            </article>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { local, menuIcon } from '@/config/wildcard'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Home',
    data () {
      return {
        list: [],
        userName: ''
      }
    },
    beforeMount () {
      const route = JSON.parse(localStorage.getItem(local.ROUTE)) || []
      this.list = route.map(item => {
        return {
          route: item.menuRoute,
          icon: menuIcon[item.menuRoute.slice(1)],
          title: item.menuName
        }
      })
      const user = JSON.parse(localStorage.getItem(local.USER))
      this.userName = user.name
    },
    methods: {
      ...mapActions([
        'swiperChange'
      ]),
      signOut () {
        this.$confirm('确认退出登录？', '退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(() => {
            this.$router.push({ path: '/Login' })
          }, 1000)
        })
      }
    },
    computed: {
      ...mapState({                  
        swiperItem: state => state.swiperItem
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .swiper-button-prev, .swiper-button-next {
    top: 25%;
    z-index: 2;
  }
  .home {
    background: url(../assets/images/bj.png) no-repeat fixed top center;
    background-size: cover;
    background-position: center;
    .header {
      position: relative;
      text-align: center;
      line-height: 20.5vh;
      background: url(~@/assets/images/decorate.png) no-repeat center center;
      background-size: 820px auto;
      color: #fff;
      font-size: 32px;
    }
  }
  nav {
    height: 88px;
    padding: 0 30px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .operation{
      display: flex;
      .self, .sign-out{
        margin-right: 16px;
        color: #fff;
        opacity: .7;
        &:hover{
          opacity: 1;
        }
      }
      i{
        font-size: 14px;
      }
    }
    .sign-out {
      cursor: pointer
    }
  }

  .content {
    height: 410px;
    position: relative;
    .center {
      margin: 15vh auto 0;
      width: 70vw;
      min-width: 980px;
      height: 100%;
      box-shadow: 0px 2px 10px -4px #091e53;
      background: #fff;
      border-radius: 10px;
      .swiper{
        position: relative;
        .swiper-main{
          margin: 0 84px;
          overflow: hidden;        
          .swiper-list{
            padding-top: 80px;
            height: 200px;
            transition-duration: .3s;   
            .swiper-slide {
              text-align: center;
              float: left;
              a{
                width: 120px;
                display: block;
                margin: 0 auto;
              }
              .swiper-slide-div {
                width: 120px;
                height: 120px;
                border-radius: 100%;
                line-height: 120px;
                text-align: center;
                margin: 0 auto 40px;
                i{
                  font-size: 68px;
                  color: #fff;
                }
              }
              .swiper-slide-title{
                color: #51596c;
                font-size: 18px;
              }
            }
          }
        }
        .swiper-scroll{
          width: 100%;
          text-align: center;
          margin-top: 60px;
          li{
            width: 10px;
            height: 10px;
            border: 1px solid #2c2b6d;
            border-radius: 50%;
            display: inline-block;
            margin: 0 5px;
            cursor: pointer;
          }
          .swiperScrollCheck{
            background: #2c2b6d;
          }
        }
        .swiper-opration{
          div{
            width: 60px;
            height: 100px;
            position: absolute;
            top: 100px;
            cursor: pointer;
            line-height: 100px;
            i{
              font-size: 50px;
              font-weight: bold;
              color: #bbb;
              transition-duration: .1s;
              &:hover{
                font-size: 70px;
                color: #999;
              }
            }
          }
          .swiper-opration-pre{
            left: 30px;
          }
          .swiper-opration-next{
            right: 30px;
          }
        }
      }
    }
  }
  .bg1 {
    background-color: #005ed5;
  }
  .bg2 {
    background-color: #00d5a1;
  }
  .bg3 {
    background-color: #ffb15b;
  }
</style>
