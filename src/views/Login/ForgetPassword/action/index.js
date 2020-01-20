import Vue from 'vue'
import vuex from 'vuex'
import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
import tree from '@/api/tree'
import { Message, MessageBox } from 'element-ui'

Vue.use(vuex)
export default new vuex.Store({
  state: {
    conditionsForm: {
      ruleForm: {
        securityCode: '',
        password: '',
        passwordEnter: ''
      }
    },
    securitystatus: false
  },
  getters: {
    securityCodeArray (state) {      
      return state.conditionsForm.ruleForm.securityCode.split('')
    },
    rules: (state) => {
      return {
        securityCode: [
          {
            trigger: 'blur', validator: (rule, value, callback) => {
              if (value.length === 6) {
                callback()
              } else if (value.length === 0) {
                callback(new Error('安全码不能为空'))
              } else {
                callback(new Error('请输入完整的安全码'))
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
              if (password === value) {
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
    securityCodeChange (state, val) {
      state.conditionsForm.ruleForm.securityCode = val
    },
    securitystatusUpdate (state, sta) {
      state.securitystatus = sta
    }
  },
  actions: {
    reset ({ commit }) {
    },
    securityCodeChange ({ commit }, val) {
      const value = val.length > 6 ? val.slice(0,6): val
      commit('securityCodeChange', value)
    },
    securitystatusUpdate ({ commit }, sta) {
      commit('securitystatusUpdate', sta)
    }
  }
})
