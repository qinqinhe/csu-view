<template>
  <div id="main-header">
    <section class="logo">
      <router-link :to='{path: "/Home"}' replace><img src='@/assets/images/logo.png' class='logo-icon'/></router-link>
    </section>
    <section class="info ri flex">
      <p class="username">
        <i class="iconfont icongerenzhongxin1"></i>
        {{userName}}，您好！
      </p>
      <div class="setting" @mouseover="settingHover" @mouseout="settingLeave">
        <p class="setting-title">
          <a href="#">
            <i class="iconfont iconshezhi"></i>
            设置
          </a>
        </p>
        <section class="setting-choose" ref='setChoose' @mouseover="settingHover">
          <ul ref='setChooseUl' @mouseover="settingHoverUl" @mouseout="settingLeaveUl">
            <li :class="{mouse: mouseIndex===0}">
              <router-link to='/PersonalCenter/PersonalInformation'>个人资料</router-link>
            </li>
            <!-- <li><router-link to='/home'>修改密码</router-link></li> -->
            <li>
              <router-link to='/Login/ForgetPassword'>忘记密码</router-link>
            </li>
            <li @click='signOut'>退出登录</li>
          </ul>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import { local } from '@/config/wildcard'

  export default {
    data () {
      return {
        userName: null,
        mouseIndex: 0
      }
    },
    mounted () {
      const user = JSON.parse(localStorage.getItem(local.USER))
      const { name } = user
      this.userName = name
    },
    beforeMount () {
    },
    methods: {
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
      },
      settingHover () {
        const setChooseUl = this.$refs['setChooseUl']
        const setChoose = this.$refs['setChoose']
        setChoose.style.height = setChooseUl.offsetHeight + 'px'
      },
      settingLeave () {
        const setChooseUl = this.$refs['setChooseUl']
        const setChoose = this.$refs['setChoose']
        setChoose.style.height = '0px'
      },
      settingHoverUl () {
        this.mouseIndex = null
      },
      settingLeaveUl () {
        this.mouseIndex = 0
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #main-header {
    height: 58px;
    background-color: #1e2e52;
    padding: 8px 36px;

    .logo {
      height: 58px;
      width: 198px;
      float: left;

      .logo-icon {
        height: 58px;
        width: 198px;
      }
    }

    .info {
      font-size: 16px;

      .username {
        color: #fff;
        margin-right: 12px;
        line-height: 58px;
      }
    }

    .setting {
      height: 54px;
      line-height: 42px;
      margin-top: 12px;
      position: relative;

      .setting-title {
        width: 82px;
        height: 42px;
        border-radius: 10px;
        background-color: #fff;
        // color: #fff;
        i {
          padding-left: 9px;
        }
      }

      .setting-choose {
        width: 309px;
        overflow: hidden;
        position: absolute;
        top: 52px;
        right: -10px;
        z-index: 2;
        transition-duration: .1s;
        height: 0px;

        ul {
          width: 307px;
          background-color: #fefefe;
          border: solid 1px #969696;

          li {
            height: 56px;
            padding: 0 20px;
            line-height: 56px;

            &:hover {
              background: $main-color;
              color: #fff;
            }

            a {
              display: block;
            }
          }

        }

        .mouse {
          background: $main-color;
          color: #fff;
        }

        // &:hover{
        // 	// padding-bottom: 400px;
        // 	ul{
        // 		// border: solid 1px #969696;
        // 	}
        // }
      }
    }
  }
</style>
