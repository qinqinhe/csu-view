import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
import tree from '@/api/tree'
import { Message, MessageBox } from 'element-ui'

const userInfo = localStorage.getItem(local.USER) ? JSON.parse(localStorage.getItem(local.USER)) : {
  userId: '',
  name: ''
}
export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        meetingRoomName: '',
        startTime: '',
        endTime: '',
        time: '',
        date: '',
        coordinateArrayVo: ''
      },
      period: []
    },
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
      }
    },
    palceTree: [],
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
    editDate: {
      visible: false,
      currentInfoId: '',
      students: null,
      ruleForm: {
        reserveObjectId: '',
        reserveObjectName: '',
        reserveType: '3',
        applyUserId: userInfo.userId,
        applyUserName: userInfo.name,
        startTime: '',
        endTime: '',
        time: '',
        context: '',
        remarks: '',
        reserveUser: []
      },
      rules: {
        reserveObjectName: [
          { required: true }
        ],
        applyUserName: [
          { required: true }
        ],
        time: [
          { required: true }
        ],
        context: [
          { required: true, message: '请输入预约内容', trigger: 'blur' }
        ]
      }
    }
  },
  mutations: {
    conditionsFormRuleFormDateSet (state, date) {
      state.conditionsForm.ruleForm.date = date
    },
    conditionsFormRuleFormCoordinateArrayVoUpatate (state, check) {
      state.conditionsForm.ruleForm.coordinateArrayVo = check
    },
    conditionsPeriodSet (state, array) {
      state.conditionsForm.period = array
    },
    conditionsTimeDefault (state, ti) {
      state.conditionsForm.ruleForm.time = ti
    },
    conditionsRuleFormDictionaryTypeNameUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeName = val
    },
    conditionsRuleFormDictionaryTypeStatusUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeStatus = val
    },
    palceTreeUpdate (state, data) {
      state.palceTree = data
    },
    paginationSizeChange (state, size) {
      state.pagination.pageRows = size
    },
    paginationCurrentChange (state, current) {
      state.pagination.pageCurrent = current
    },
    paginationTotalChange (state, total) {
      state.pagination.total = total
    },
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    editCurrentInfoIdUpdate (state, { infoId, infoName }) {
      state.editDate.currentInfoId = infoId
      state.editDate.ruleForm.reserveObjectId = infoId
      state.editDate.ruleForm.reserveObjectName = infoName
      const time = state.conditionsForm.ruleForm.time.split('-')
      const date = state.conditionsForm.ruleForm.date
      state.editDate.ruleForm.time = `${date} ${time[0]} - ${date} ${time[1]}`
      state.editDate.ruleForm.startTime = `${date} ${time[0]}`
      state.editDate.ruleForm.endTime = `${date} ${time[1]}`
    },
    editDateVisibleUpdate (state, sta) {
      state.editDate.visible = sta
    },
    editDateStudentsSet (state, arr) {
      state.editDate.students = arr
    },
    editDateRuleFormReserveUserUpdate (state, infoIds) {
      state.editDate.ruleForm.reserveUser = infoIds
    }
  },
  actions: {
    conditionsFormRuleFormDateSet ({ commit }) {
      const time = new Date()
      const num = (n) => {
        return n > 9 ? n : '0' + n
      }
      const year = time.getFullYear()
      const month = num(time.getMonth() + 1)
      const date = num(time.getDate())
      commit('conditionsFormRuleFormDateSet', `${year}-${month}-${date}`)
    },
    conditionsRuleFormDictionaryTypeNameUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeNameUpdate', val)
    },
    conditionsRuleFormDictionaryTypeStatusUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeStatusUpdate', val)
    },
    async conditionsPeriodResponse ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/meeting/api/timeArrangeConfig/queryAllTimeArranges'
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('conditionsPeriodSet', data.map(item => {
          item.start = item.startTime.substr(0, 5)
          item.end = item.endTime.substr(0, 5)
          return item
        }))
        commit('conditionsTimeDefault', `${data[0].start}-${data[0].end}`)
      }
    },
    async place ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/system/api/place/queryAllPlace '
      })
      if (resultCode === code.CODE_SUCCESS) {
        const dataTree = tree({
          arr: data,
          ids: 'placeInfoId',
          name: 'placeName'
        })
        commit('palceTreeUpdate', dataTree)
      }
    },
    checkChange ({ commit, dispatch }, data) {
      const childCheck = data.childCheck.map(item => {
        const itemArray = item.split(',')
        if (itemArray.length < 2) {
          itemArray[1] = 0
        }
        if (itemArray.length < 3) {
          itemArray[2] = 0
        }
        return itemArray.join('|')
      }).join(',')
      commit('conditionsFormRuleFormCoordinateArrayVoUpatate', childCheck)
      dispatch('inquiry')
    },
    async inquiry ({ commit, state }) {
      const { meetingRoomName, time, date, coordinateArrayVo } = state.conditionsForm.ruleForm
      const timeArray = time ? time.split('-') : ['', '']
      const ruleForm = {
        meetingRoomName,
        startTime: `${date} ${timeArray[0]}:00`,
        endTime: `${date} ${timeArray[1]}:00`,
        coordinateArrayVo
      }
      const { resultCode, data } = await webapi({
        url: '/meeting/api/meetingRoom/queryEnableMeetingRoomListByPage',
        data: {
          ...state.pagination,
          ...ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const { rowSum, rows } = data
        commit('tableDataUpdate', rows)
        commit('paginationTotalChange', rowSum)
      }
    },
    async students ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '2'
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('editDateStudentsSet', data.map(item => {
          item.id = item.userInfoId
          return item
        }))
      }
    },
    handleSelectionChange ({ commit }, arr) {
      const infoIds = arr.map(item => item.dictionaryTypeInfoId)
      commit('delDatecurrentInfoId', infoIds.join())
    },
    paginationSizeChange ({ commit, dispatch }, size) {
      commit('paginationSizeChange', size)
      dispatch('inquiry')
    },
    paginationCurrentChange ({ commit, dispatch, state }, current) {
      commit('paginationCurrentChange', current)
      state.conditionsForm.period.length && dispatch('inquiry')
    },
    editDateVisibleOpen ({ commit, dispatch }, { state, infoId, infoName }) {
      commit('editDateVisibleUpdate', state)
      commit('editCurrentInfoIdUpdate', { infoId, infoName })
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    studentsCheck ({ commit }, { data, checked }) {
      commit('editDateRuleFormReserveUserUpdate', checked.checkedNodes.map(item => {
        return {
          userInfoId: item.userInfoId,
          userName: item.userName
        }
      }))
    },
    async editsubmitForm ({ commit, state, dispatch }) {

      const {
        reserveObjectId,
        reserveObjectName,
        reserveType,
        applyUserId,
        applyUserName,
        startTime,
        endTime,
        context,
        remarks,
        reserveUser
      } = state.editDate.ruleForm

      let ruleForm = {
        reserveObjectId,
        reserveType,
        applyUserId,
        applyUserName,
        startTime: startTime + ':00',
        endTime: endTime + ':00',
        context,
        remarks
      }
      reserveUser.forEach((item, index) => {
        const arr = item.split(' - ')
        ruleForm[`reserveUser[${index}].userName`] = arr[1]
        ruleForm[`reserveUser[${index}].userInfoId`] = arr[0]
      })
      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/addReserve',
        data: {
          ...ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('editDateVisibleUpdate', false)
        dispatch('inquiry')
      }

    },
    editListTotalwarningUpdate ({ commit }, sta) {
      commit('editListTotalwarningUpdate', sta)
    }
  }
}
