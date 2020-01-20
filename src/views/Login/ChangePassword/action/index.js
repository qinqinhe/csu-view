import Vue from 'vue'
import vuex from 'vuex'
import webapi from '@/api/http'
import { code } from '@/config/wildcard'
import { Message } from 'element-ui'

Vue.use(vuex)
export default new vuex.Store({
  state: {
    conditionsForm: {
      ruleForm: {
        userPwd: '',
        password: '',
        passwordEnter: '',
        userPwdVisible: false,
        passwordVisible: false,
        passwordEnterVisible: false
      }
    }
  },
  getters: {
    rules: (state) => {
      return {
        userPwd: [
          {
            trigger: 'blur', validator: (rule, value, callback) => {
              if (value.length) {
                callback()
              } else {
                callback(new Error('旧密码不能为空'))
              }
            }
          }
        ],
        password: [
          {
            trigger: 'blur', validator: (rule, value, callback) => {
              const password = /^[A-Za-z0-9]{6,15}$/
              if (password.test(value)) {
                callback()
              } else if (value.length === 0) {
                callback(new Error('密码不能为空'))
              } else {
                callback(new Error('请输入6-15位的字母或者数字'))
              }
            }
          }
        ],
        passwordEnter: [
          {
            trigger: 'blur', validator: (rule, value, callback) => {
              const { password } = state.conditionsForm.ruleForm
              if (value.length === 0) {
                callback(new Error('确认密码不能为空'))
              } else if (password === value) {
                callback()
              } else {
                callback(new Error('密码输入不一致'))
              }
            }
          }
        ]
      }
    }
  },
  mutations: {
    userPwdVisibleUpdate (state, sta) {
      state.conditionsForm.ruleForm.userPwdVisible = sta
    },
    passwordVisibleUpdate (state, sta) {
      state.conditionsForm.ruleForm.passwordVisible = sta
    },
    passwordEnterVisibleUpdate (state, sta) {
      state.conditionsForm.ruleForm.passwordEnterVisible = sta
    }
  },
  actions: {
    async ChangePassword ({ commit, state }) {
      const { userPwd, password } = state.conditionsForm.ruleForm
      const { resultCode, data, resultMessage } = await webapi({
        url: '/user/api/user/updateUserPwd',
        data: {
          userPwd,
          password
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          message: resultMessage,
          type: 'success'
        })
      }
    }
  }
})
