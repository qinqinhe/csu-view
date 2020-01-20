import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    examinationHallPwd: '20b8777d-18ea-4dcf-a784-03c378c6073d',
    passwordVisible: false,
    examinationEndTime: null,
    examinationInfoId: null,
    ExaminationList: [],
    ExaminationListTotal: 0,
    questionCatgoryStatus: true,
    questionIndex: 0,
    questionCurrent: {},
    timer: '00:00:00',
    minute15: false,
    startTime: null,
    endTime: null,
    examinationResultVisible: false,
    examinationResult: {
      totalScore: 100,
      questionsTotal: 100,
      examinationScore: 0,
      qualifiedScore: 60,
      correctNum: 0,
      wrongNum: 2,
      qualified: false,
      scoringRate: 80
    },
    examinationEnd: false

  },
  getters: {},
  mutations: {
    passwowrdUpdate (state, val) {
      state.examinationHallPwd = val
    },
    passwordVisibleUpdate (state) {
      state.passwordVisible = !state.passwordVisible
    },
    examinationInfoIdSet (state, infoId) {
      state.examinationInfoId = infoId
    },
    ExaminationListset (state, arr) {
      state.ExaminationList = arr
      state.ExaminationListTotal = arr.length
    },
    questionCatgoryStatusChange (state, sta) {
      state.questionCatgoryStatus = sta
    },
    questionChange (state, index) {
      state.questionIndex = index
      state.questionCurrent = state.ExaminationList[index]
    },
    questionChoose (state, optionIndex) {
      state.ExaminationList = state.ExaminationList.map((item, index) => {
        if (state.questionIndex === index) {
          
          item.examineeAnswer = optionIndex
        }
        return item
      })
    },
    questionAnswer (state, InfoId) {
      state.ExaminationList = state.ExaminationList.map((item, index) => {
        if (item.questionBankInfoId === InfoId) {
          item.answered = true
        }
        return item
      })
    },
    questionAnswerRecordId (state, InfoId) {
      state.ExaminationList = state.ExaminationList.map((item, index) => {
        if (item.questionBankInfoId === InfoId) {
          item.answerRecordId = 1
        }
        return item
      })
    },
    countdown (state, time) {
      state.timer = time
    },
    examinationEndTimeSet (state, time) {
      state.examinationEndTime = time
    },
    minute15Set (state, sta) {
      state.minute15 = sta
    },
    timeSet (state, type) {
      const time = new Date()
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      const hour = time.getHours()
      const minute = time.getMinutes()
      const second = time.getSeconds()
      const timeDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      if (type === 'start') {
        state.startTime = timeDate
      } else if (type === 'end') {
        state.endTime = timeDate
      }
    },
    examinationResultVisibleUpdate (state) {
      const sta = !state.examinationResultVisible
      state.examinationResultVisible = sta
    },
    examinationResultUpdate (state, data) {
      state.examinationResult = data
      state.examinationEnd = true
    }
  },
  actions: {
    passwowrdUpdate ({ commit }, val) {
      commit('passwowrdUpdate', val)
    },
    passwordVisibleUpdate ({ commit }) {
      commit('passwordVisibleUpdate')
    },
    async ExaminationListset ({ commit, state }) {
      if (state.examinationHallPwd) {
        const { resultCode, data } = await webapi({
          url: '/examination/api/examinationRecord/queryExaminationAndReservation',
          data: {
            examinationHallPwd: state.examinationHallPwd
          }
        })
        if (resultCode === code.CODE_SUCCESS) {
          const { examinationInfoId, examinationEndTime } = data
          commit('examinationEndTimeSet', examinationEndTime)
          commit('examinationInfoIdSet', examinationInfoId)
          const questionRes = await webapi({
            url: '/examination/api/examinationRecord/addExaminationQuestion',
            data: {
              examinationInfoId: examinationInfoId
            }
          })
          const questionResultCode = questionRes.resultCode,
            questionData = questionRes.data
          if (questionResultCode === code.CODE_SUCCESS) {
            commit('ExaminationListset', questionData.map((item, index) => {
              item.sort = index
              item.answered = Boolean(item.examineeAnswer) 
              item.answerRecordId = item.answerRecordId || 0 
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
          }
        }
      } else {
        Message({
          message: '请输入密码',
          type: 'warning'
        })
      }
    },
    countdown ({ commit, state }) {

      const num = (n) => {
        return n > 9 ? n : `0${n}`
      }
      let TimeCalculation = setInterval(() => {
        const timeNow = new Date().getTime()
        const timeEnd = new Date(state.examinationEndTime).getTime()
        const time = Math.floor((timeEnd - timeNow) / 1000)
        if (time >= 0 && !state.examinationEnd) {
          var modulo = null
          const hour = Math.floor(time / (60 * 60))
          modulo = time - hour * 60 * 60
          const minute = Math.floor(modulo / 60)
          modulo = modulo - minute * 60
          const second = modulo
          commit('countdown', `${num(hour)}:${num(minute)}:${num(second)}`)
          if (time === 60 * 15) {
            Message({
              message: '距离交卷还有15分钟！',
              type: 'warning'
            })
            commit('minute15Set', true)
          }
        } else {
          commit('countdown', '考试结束')
          clearInterval(TimeCalculation)
        }
      }, 1000)
    },
    questionChoose ({ commit, state }, optionIndex) {
      !state.examinationEnd && commit('questionChoose', optionIndex)
    },
    async addLearnRecord ({ commit, state }) {
      const { answerRecordId, examineeAnswer, questionBankInfoId, examinationQuestionId, examinationInfoId } = state.questionCurrent
      const { resultCode, data } = await webapi({
        url: '/examination/api/examinationRecord/addAnswerRecord ',
        data: {
          answerRecordId,
          examinationQuestionId: examinationQuestionId,
          examineeAnswer: examineeAnswer,
          questionBankInfoId,
          examinationInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        (answerRecordId === 0) && commit('questionAnswerRecordId', data.answerRecordId)
        commit('questionAnswer', questionBankInfoId)
      }
    },
    async questionChange ({ dispatch, commit, state }, index) {
      const { examineeAnswer } = state.questionCurrent
      !state.examinationEnd && examineeAnswer && await dispatch('addLearnRecord')
      commit('questionChange', index)
    },
    async questionSubmit ({ dispatch, commit, state }) {

      const { examineeAnswer } = state.questionCurrent
      !examineeAnswer && await dispatch('addLearnRecord')
      const carryOut = state.ExaminationList.every(item => {
        return item.answerRecordId
      })

      await MessageBox.confirm(`${carryOut ? '' : '您还有未填写的考题，'}确定提交试卷?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          
          
          
          
          
          
          
          
          
          
          
          
          dispatch('addExaminationRecord')
        })
    },
    async addExaminationRecord ({ commit, state }) {
      commit('timeSet', 'end')
      const { startTime, endTime } = state
      const { resultCode, data } = await webapi({
        url: '/examination/api/examinationRecord/addExaminationRecord',
        data: {
          examinationInfoId: state.examinationInfoId,
          startTime: startTime,
          endTime: endTime
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        data.qualified = data.examinationScore >= data.qualifiedScore
        data.scoringRate = Math.round(data.examinationScore / data.totalScore * 100)
        commit('examinationResultUpdate', data)
        commit('examinationResultVisibleUpdate')
      }
    },
    examinationResultVisibleUpdate ({ commit }) {
      commit('examinationResultVisibleUpdate')
    }
  }
}
