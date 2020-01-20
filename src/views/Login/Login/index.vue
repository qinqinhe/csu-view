<template>
  <div class="w100 h100 loginBox">
    <div class="loginForm">
      <div class="logoImg"><img src="@/assets/images/logo-2.png"/></div>
      <p class='title'>&nbsp;登录</p>
      <el-form
        :model="user"
        :rules="rules"
        ref="ruleForm">
        <el-form-item prop='username'>
          <input v-model="user.username" class="el-input__inner"/>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            v-model="user.password"
            :type="passVisible ? 'text' : 'password'"
            placeholder="请输入登录密码"
            maxlength="15"
            @input='change($event)'
          />
            <img
              v-if='passVisible'
              slot="suffix"
              src="@/assets/images/eyeText.png"
              class="eye-visible"
              @click='passVisible=false'
            />
            <img
              v-else slot="suffix"
              src="@/assets/images/eyePassword.png"
              class="eye-visible"
              @click='passVisible=true'
            />
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button plain class="w100" @click="submit('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import routeAssemble from '@/api/routeAssemble'
import { code, local } from '@/config/wildcard'
import socket from '@/api/socket'

export default {
  data () {
    return {
      user: {
        username: '20180000005',
        password: '312569'
      },
      rules: {
        username: [
          { required: true, message: '请输入登陆账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            trigger: 'blur', validator: (rule, value, callBack) => {
              const reg = /^[A-Za-z0-9]+$/
              if (reg.test(value)) {
                callBack()
              } else {
                callBack(new Error('请输入数字或者字母'))
              }
            }
          }
        ]
      },
      passVisible: false
    }
  },
  mounted () {
    this.clearLocal()
  },
  methods: {
    change (e) {
    },
    clearLocal () {
      localStorage.removeItem(local.TOKEN)
      localStorage.removeItem(local.USER)
      localStorage.removeItem(local.ROUTE)
      localStorage.removeItem(local.ROUTEMATCH)
      localStorage.removeItem(local.MENU)
    },
    handleLogin () {
    },
    submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userInfo()
        }
      })
    },
    async userInfo () {
      this.clearLocal()
      await this.webapi({
        url: '/auth/authentication/form',
        headers: {
          Authorization: 'Y2xpZW50OjEyMzQ1Ng==',
          ContentType: 'application/x-www-form-urlencoded'
        },
        data: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(res => {
        const { resultCode, resultMessage, data } = res
        if (resultCode === code.CODE_SUCCESS) {
          localStorage.setItem(local.TOKEN, data.value)
          localStorage.setItem(local.USER, JSON.stringify(data.additionalInformation))
        }
      })
      const userInformation = JSON.parse(localStorage.getItem(local.USER))
      await localStorage.getItem(local.TOKEN) && userInformation && this.webapi({
        url: '/user/api/menu/queryMenuListByUserInfoId',
        data: {}
      }).then(res => {
        const { resultCode, resultMessage, data } = res
        if (resultCode === code.CODE_SUCCESS) {
          localStorage.setItem(local.MENU, JSON.stringify(data))
          const route = routeAssemble(data)
          localStorage.setItem(local.ROUTE, JSON.stringify(route))
          
          
          
          
          location.replace(window.location.origin)
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .loginBox {
    background: url("~@/assets/images/login-bj.png") no-repeat fixed top center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .loginForm {
      width: 360px;
      height: 500px;
      background: rgba(250, 250, 250, 0.8);
      border-radius: 10px;
      padding: 30px;
      .logoImg {
        img {
          width: 55%;
          padding: 35px 0 25px;
        }
      }
      .el-form-item{        
        width: 100%;
        
      }
      
      
      
      .el-form-item__label {
        display: block;
        color: #464c5b;
        font-size: 18px;
      }


      .el-button {
        padding: 20px 15px;
        border-radius: 10px;
        margin-top: 50px;
        font-size: 18px;
        color: #fff;
        background-color: #044e96;
        
      }

      .el-input__inner::-webkit-input-placeholder {
        color: #9ea7b4;
      }

      /* 使用webkit内核的浏览器 */
      .el-input__inner::-moz-placeholder {
        color: #9ea7b4;
      }

      /* Firefox版本4-18 */
      .el-input__inner::-moz-placeholder {
        color: #9ea7b4;
      }

      /* Firefox版本19+ */
      .el-input__inner:-ms-input-placeholder {
        color: #9ea7b4;
      }

      /* IE浏览器 */
    }
  }

  .title {
    line-height: 50px;
    color: #464c5b;
    font-size: 18px;
  }

  .eye-visible {
    width: 24px;
    padding-top: 8px;
    padding-right: 8px;
  }
</style>
<style lang="scss">
.loginBox{
  .loginForm{
    .el-input__inner{
      padding: 0px 15px;
      height: 50px;
      border-radius: 10px;
    }
  }
}
</style>
