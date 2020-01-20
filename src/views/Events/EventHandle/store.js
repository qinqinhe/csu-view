import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        eventName: '',
        handleResult: ''
      },
      handleResultSelect: [
        { value: '', label: '所有' },
        { value: '0', label: '无法处理' },
        { value: '1', label: '误报' },
        { value: '2', label: '需维修' },
        { value: '3', label: '警情' }
      ]
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
    feedbackPerson: [],
    eventType: [],
    hardType: [],
    maintaincePerson: [],
    pickerOptions: {
      disabledDate: time => {
        const curDate = Date.now()
        return time.getTime() < curDate
      }
    },
    handleResult: [
      { value: '0', label: '无法处理' },
      { value: '1', label: '误报' },
      { value: '2', label: '需维修' },
      { value: '3', label: '警情' }
    ],
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        eventInfoId: '',
        eventHandleCode: '',
        eventName: '',
        eventType: '',
        designatorName: '',
        feedbackPerson: '',
        feedbackPersonName: '',
        handleResult: '',
        handleDescription: ''
      },
      rules: {
        eventHandleCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        eventName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '请输入类型', trigger: 'blur' }
        ],
        feedbackPerson: [
          { required: true, message: '请输入被指派人id', trigger: 'blur' }
        ]
      }
    },
    maintainDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        maintainceInfoCode: '',
        time: [],
        startTime: '',
        endTime: '',
        description: '',
        maintaincePersoner: '',
        maintaincePerson: '',
        maintaincePersonName: '',
        addListTotalwarning: false,
        maintainceLists: []
      },
      rules: {
        maintainceInfoCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入说明', trigger: 'blur' }
        ],
        maintaincePersoner: [
          { required: true, message: '请选择维护人', trigger: 'change' }
        ],
        maintainceListCode: [
          { required: true, trigger: 'blur' }
        ],
        hardType: [
          { required: true, trigger: 'change' }
        ],
        hardNumber: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  getters: {},
  mutations: {
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    feedbackPersonSet (state, array) {
      state.feedbackPerson = array
    },
    eventTypeSet (state, array) {
      state.eventType = array
    },
    hardTypeSet (state, array) {
      state.hardType = array
    },
    maintaincePersonSet (state, array) {
      state.maintaincePerson = array
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
    editDateVisibleUpdate (state, sta) {
      state.editDate.visible = sta
    },
    editCurrentInfoIdUpdate (state, infoId) {
      state.editDate.currentInfoId = infoId
    },
    editDateUpdate (state, data) {
      state.editDate.ruleForm = data
    },
    maintainDateAddTemplate (state) {
      state.maintainDate.ruleForm.maintainceLists.push({
        maintainceListCode: '',
        hardType: '',
        hardNumber: ''
      })
    },
    maintaindelTemplate (state, index) {
      state.maintainDate.ruleForm.maintainceLists.splice(index, 1)
    },
    maintainDateVisibleUpdate (state, sta) {
      state.maintainDate.visible = sta
    },
    maintainAddListTotalwarning (state, sta) {
      state.maintainDate.ruleForm.addListTotalwarning = sta
    },
    maintainCurrentInfoIdUpdate (state, infoId) {
      state.maintainDate.currentInfoId = infoId
    },
    maintainDateUpdate (state, data) {
      state.maintainDate.ruleForm = data
    }
  },
  actions: {
    paginationSizeChange ({ commit, dispatch }, size) {
      commit('paginationSizeChange', size)
      dispatch('inquiry')
    },
    paginationCurrentChange ({ commit, dispatch }, current) {
      commit('paginationCurrentChange', current)
      dispatch('inquiry')
    },
    async inquiry ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/event/api/eventHandle/getEventHandleList ',
        data: {
          ...state.pagination,
          ...state.conditionsForm.ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const { rowSum, rows } = data
        commit('tableDataUpdate', rows)
        commit('paginationTotalChange', rowSum)
      }
    },
    async feedbackPersonSet ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '3'
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
      }
      commit('feedbackPersonSet', data)
    },
    async dictionary ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/system/api/dictionaryType/queryDictionaryByDictionaryTypeCodeArray',
        data: {
          dictionaryTypeCodeArray: [dictionary.event_type.code, dictionary.hard_type.code]
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        data.forEach(item => {
          if (item.dictionaryTypeCode === dictionary.event_type.code) {
            commit('eventTypeSet', item.dictionaryTypeListValueList)
          } else if (item.dictionaryTypeCode === dictionary.hard_type.code) {
            commit('hardTypeSet', item.dictionaryTypeListValueList)
          }
        })
      }
    },
    async maintaincePersonSet ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '1'
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
      }
      commit('maintaincePersonSet', data)
    },
    async detail ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/event/api/eventHandle/getEventHandleDetail ',
        data: {
          eventHandleId: state.editDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          eventInfoId,
          eventHandleCode,
          eventName,
          eventType,
          designatorName,
          feedbackPerson,
          feedbackPersonName,
          handleResult,
          handleDescription
        } = data
        commit('editDateUpdate', {
          eventInfoId,
          eventHandleCode,
          eventName,
          eventType,
          designatorName,
          feedbackPerson: feedbackPerson,
          feedbackPersonName,
          handleResult,
          handleDescription
        })
      }
    },
    editDateVisibleUpdate ({ commit, dispatch }, { state, infoId }) {
      commit('editDateVisibleUpdate', state)
      if (state) {
        commit('editCurrentInfoIdUpdate', infoId)
        dispatch('detail')
      }
    },
    async editSubmitForm ({ commit, state, dispatch }) {
      const {
        eventInfoId,
        handleResult,
        handleDescription
      } = state.editDate.ruleForm
      
      const ruleForm = {
        eventInfoId,
        handleResult,
        handleDescription
      }
      const { resultCode, data } = await webapi({
        url: '/event/api/eventHandle/updateEventHandle',
        data: {
          ...ruleForm,
          eventHandleId: state.editDate.currentInfoId
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
    maintainAddListTotalwarning ({ commit }, sta) {
      commit('maintainAddListTotalwarning', sta)
    },
    maintainDateAddTemplate ({ commit }) {
      commit('maintainDateAddTemplate')
      commit('maintainAddListTotalwarning', false)
    },
    maintaindelTemplate ({ commit }, index) {
      commit('maintaindelTemplate', index)
    },
    maintainDateVisibleUpdate ({ commit, dispatch }, { state, infoId }) {
      commit('maintainDateVisibleUpdate', state)
      if (state) {
        commit('maintainCurrentInfoIdUpdate', infoId)
        
      }
    },
    async maintainSubmitForm ({ commit, state, dispatch }) {
      const {
        maintainceInfoCode,
        time,
        description,
        maintaincePersoner,
        maintainceLists
      } = state.maintainDate.ruleForm
      
      const maintaincePersonArr = maintaincePersoner.split('-')
      const ruleForm = {
        maintainceInfoCode,
        startTime: time[0],
        endTime: time[1],
        description,
        maintaincePerson: maintaincePersonArr[0],
        maintaincePersonName: maintaincePersonArr[1]
      }
      maintainceLists.forEach((item, index) => {
        ruleForm[`maintainceLists[${index}].maintainceListCode`] = item.maintainceListCode
        ruleForm[`maintainceLists[${index}].hardType`] = item.hardType
        ruleForm[`maintainceLists[${index}].hardNumber`] = item.hardNumber
      })
      const { resultCode, data } = await webapi({
        url: '/event/api/maintainceInfo/addMaintainceInfo',
        data: {
          ...ruleForm,
          eventHandleId: state.maintainDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('maintainDateVisibleUpdate', false)
      }

    }
  }
}
