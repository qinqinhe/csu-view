import webapi from '@/api/webapi'
import { code, dictionary } from '@/config/wildcard'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    questionCatgory: [],
    learnList: [],
    questionCatgoryStatus: true,
    questionIndex: 0,
    questionCurrent: {}
  },
  getters: {},
  mutations: {
    questionCatgorySet (state, arr) {
      state.questionCatgory = arr
    },
    learnListset (state, arr) {
      state.learnList = arr
    },
    questionCatgoryStatusChange (state, sta) {
      state.questionCatgoryStatus = sta
    },
    questionChange (state, index) {
      state.questionIndex = index
      state.questionCurrent = state.learnList[index]
    },
    questionChoose (state, optionIndex) {
      state.learnList = state.learnList.map((item, index) => {
        if (state.questionIndex === index) {
          item.Answer = optionIndex
        }
        return item
      })
    },
    questionAnswer (state, InfoId) {
      state.learnList = state.learnList.map((item, index) => {
        if (item.questionBankInfoId === InfoId) {
          item.answered = true
        }
        return item
      })
    }
  },
  actions: {
    questionCatgorySet ({ commit }, arr) {
      webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.laboratory_type.code
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          commit('questionCatgorySet', data)
        }
      })
    },
    learnListset ({ commit }, questionCategory) {
      webapi({
        url: '/examination/api/studentLearn/queryLearnQuestion',
        data: {
          questionCategory: questionCategory
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          const { rows } = data
          if (rows.length) {
            commit('learnListset', rows.map((item, index) => {
              item.sort = index + 1
              item.answered = Boolean(item.examineeAnswer) 
              item.Answer = item.examineeAnswer 
              item.question = [
                { sort: 'A', text: item.optiona },
                { sort: 'B', text: item.optionb },
                { sort: 'C', text: item.optionc },
                { sort: 'D', text: item.optiond }
              ]
              return item
            }))
            commit('questionChange', 0)
            commit('questionCatgoryStatusChange', false)
          } else {
            Message({
              message: '暂无学习试题',
              type: 'warning'
            })
          }
        }
      })
    },
    questionChoose ({ commit }, optionIndex) {
      commit('questionChoose', optionIndex)
    },
    addLearnRecord ({ commit, state }, InfoId) {
      if (state.questionCurrent.Answer) {
        webapi({
          url: '/examination/api/studentLearn/addLearnRecord ',
          data: {
            questionBankInfoId: InfoId,
            learnRecordStatus: 1,
            examineeAnswer: state.questionCurrent.Answer
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {

              commit('questionAnswer', InfoId)
            }
          })
      } else {
        Message({
          message: '请选择选项！',
          type: 'warning'
        })
      }
    }
  }
}
