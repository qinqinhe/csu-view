import Vue from 'vue';
import vuex from 'vuex';
import webapi from '@/api/http';
import { code, dictionary, local } from '@/config/wildcard';
import tree from "@/api/tree";
import { Message, MessageBox  } from 'element-ui'

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
    basicInformation: {
      userName: '',
      job: '',
      userSex: '1',
      phoneNumber: '',
      identificationNumber: '',
      userBirthday: ''
    }
  },
  getters: {
    securityCodeArray (state) {
      return state.conditionsForm.ruleForm.securityCode.split('')
    },
    rules: (state) => {
      return {        
        securityCode: [
          { trigger: 'blur', validator: (rule, value, callback) => {
            if (value.length === 6) {
              callback()
            } else if (value.length === 0) {
              callback(new Error('安全码不能为空'))
            } else {
              callback(new Error('请输入完整的安全码'))
            }
          }}
        ],
        password: [
          { trigger: 'blur', validator: (rule, value, callback) => {
            const password = /^[A-Za-z0-9]{6,15}$/
            if (password.test(value)) {
              callback()
            } else if (value.length === 0) {
              callback(new Error('密码不能为空'))
            } else {
              callback(new Error('请输入6-15位的字母或者数字'))
            }
          }}
        ],
        passwordEnter: [
          { trigger: 'blur', validator: (rule, value, callback) => {
            const { password } = state.conditionsForm.ruleForm
            if (password===value) {
              callback()
            } else {
              callback(new Error('密码输入不一致'))
            }
          }}
        ]
      }
    }
  },
  mutations: {
    basicInformationUpdate (state, json) {
      state.basicInformation = json
    }
  },
  actions: {
    async inquire ({ commit }) {
      const { resultCode, data } = await webapi({
        url: "/user/api/user/getUserInfoById"
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          userName,
          job,
          userSex,
          phoneNumber,
          identificationNumber,
          userBirthday
        } = data
        this.commit('basicInformationUpdate', {
          userName,
          job,
          userSex,
          phoneNumber,
          identificationNumber,
          userBirthday
        })
      
      
      
      
      
      
      }
    }
  }
})