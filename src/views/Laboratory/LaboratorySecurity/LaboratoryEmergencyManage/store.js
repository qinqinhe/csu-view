import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        eventStatus: '',
        eventResult: '',
        eventName: ''
        
      },
      eventStatusSelect: [
        { value: '', label: '所有' },
        { value: '0', label: '待处理' },
        { value: '1', label: '已处理' },
        { value: '2', label: '处理中' }
      ],
      eventResultSelect: [
        { value: '', label: '所有' },
        { value: '0', label: '未完成' },
        { value: '1', label: '已完成' }
      ]
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
    system: {},
    subsystem: {},
    eventType: {},
    eventLevel: {},
    feedbackPerson: [],
    eventStatus: [
      { value: '0', label: '待处理' },
      { value: '1', label: '已处理' },
      { value: '2', label: '处理中' }
    ],
    eventResult: [
      { value: '0', label: '未完成' },
      { value: '1', label: '已完成' }
    ],
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        eventCode: '',
        eventName: '',
        eventType: '',
        eventObjectId: '',
        eventObjectName: '',
        belongSystem: '',
        belongSubsystem: '',
        reportTime: '',
        eventLevel: '',
        eventStatus: '',
        eventResult: '',
        eventHandleId: '',
        remarks: ''
      },
      rules: {
        eventStatus: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        eventResult: [
          { required: true, message: '请选择结果', trigger: 'blur' }
        ]
      }
    },
    detailDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectRecordCode: '',
        inspectPlanName: '',
        planExecutorUserName: '',
        inspectRecordStatus: '',
        inspectEductInfo: []
      }
    },
    handleDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        eventHandleCode: '',
        eventName: '',
        eventType: '',
        designatorName: '',
        feedbackPerson: '',
        feedbackPersonName: ''
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
    }
  },
  getters: {},
  mutations: {
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    subsystemSet (state, json) {
      state.subsystem = json
    },
    systemSet (state, json) {
      state.system = json
    },
    eventTypeSet (state, json) {
      state.eventType = json
    },
    eventLevelSet (state, json) {
      state.eventLevel = json
    },
    feedbackPersonSet (state, array) {
      state.feedbackPerson = array
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
    editCurrentInfoIdUpdate (state, infoId) {
      state.editDate.currentInfoId = infoId
    },
    editDateVisibleUpdate (state, sta) {
      state.editDate.visible = sta
    },
    editDateUpdate (state, date) {
      state.editDate.ruleForm = date
    },
    editDateReset (state) {
      state.editDate.ruleForm = {
        eventHandleCode: '',
        eventName: '',
        eventType: '',
        designatorName: '',
        feedbackPerson: '',
        feedbackPersonName: ''
      }
    },
    detailDateVisibleUpdate (state, sta) {
      state.detailDate.visible = sta
    },
    detailDateUpdate (state, data) {
      state.detailDate.ruleForm = data
    },
    detailCurrentInfoIdUpdate (state, infoId) {
      state.detailDate.currentInfoId = infoId
    },
    handleDateVisibleUpdate (state, sta) {
      state.handleDate.visible = sta
    },
    handleCurrentInfoIdUpdate (state, infoId) {
      state.handleDate.currentInfoId = infoId
    },
    handleDateEventTypeUpdate (state, eventType) {
      state.handleDate.ruleForm.eventType = eventType
    }
  },
  actions: {
    conditionsRuleFormDictionaryTypeNameUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeNameUpdate', val)
    },
    conditionsRuleFormDictionaryTypeStatusUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeStatusUpdate', val)
    },
    async inquiry ({ commit, state }) {
      console.log(state.conditionsForm.ruleForm)
      const { resultCode, data } = await webapi({
        url: '/event/api/eventInfo/getRoomEventInfoList ',
        data: {
          roomType: '1',
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
    async dictionary ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/system/api/dictionaryType/queryDictionaryByDictionaryTypeCodeArray',
        data: {
          dictionaryTypeCodeArray: [dictionary.system.code, dictionary.subsystem.code, dictionary.event_type.code, dictionary.event_level.code]
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        data.forEach(item => {
          const dictionaryJson = {}
          item.dictionaryTypeListValueList.forEach(items => {
            dictionaryJson[items.dictionaryDataInfoId] = items.dictionaryValue
          })
          if (item.dictionaryTypeCode === dictionary.system.code) {
            commit('systemSet', dictionaryJson)
          } else if (item.dictionaryTypeCode === dictionary.subsystem.code) {
            commit('subsystemSet', dictionaryJson)
          } else if (item.dictionaryTypeCode === dictionary.event_type.code) {
            commit('eventTypeSet', dictionaryJson)
            console.log(dictionaryJson)
          } else if (item.dictionaryTypeCode === dictionary.event_level.code) {
            commit('eventLevelSet', dictionaryJson)
          }
        })
      }
    },
    async feedbackPersonSet ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '1'
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
      }
      commit('feedbackPersonSet', data)
    },
    paginationSizeChange ({ commit, dispatch }, size) {
      commit('paginationSizeChange', size)
      dispatch('inquiry')
    },
    paginationCurrentChange ({ commit, dispatch }, current) {
      commit('paginationCurrentChange', current)
      dispatch('inquiry')
    },
    editDateVisibleOpen ({ commit, dispatch }, { state, infoId }) {
      commit('editDateVisibleUpdate', state)
      commit('editCurrentInfoIdUpdate', infoId)
      dispatch('detail', infoId)
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async detail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/event/api/eventInfo/getEventInfoDetail ',
        data: {
          eventInfoId: infoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('editDateUpdate', data)
        commit('detailDateUpdate', data)
      }
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const {
        eventStatus,
        eventResult,
        remarks
      } = state.editDate.ruleForm
      const ruleForm = {
        eventStatus,
        eventResult,
        remarks
      }
      const { resultCode, data } = await webapi({
        url: '/event/api/eventInfo/updateEventInfo',
        data: {
          ...ruleForm,
          eventInfoId: state.editDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('editDateReset')
        commit('editDateVisibleUpdate', false)
        dispatch('inquiry')
      }

    },
    detailDateVisibleUpdate ({ commit, dispatch }, { state, infoId }) {
      commit('detailDateVisibleUpdate', state)
      if (state) {
        commit('detailCurrentInfoIdUpdate', infoId)
        dispatch('detail', infoId)
      }
    },
    handleDateVisibleUpdate ({ commit, dispatch }, { state, infoId, eventType }) {
      commit('handleDateVisibleUpdate', state)
      if (state) {
        commit('handleCurrentInfoIdUpdate', infoId)
        commit('handleDateEventTypeUpdate', eventType)
      }
    },
    async handlesubmitForm ({ commit, state, dispatch }) {
      const {
        eventHandleCode,
        eventName,
        eventType,
        feedbackPerson
      } = state.handleDate.ruleForm
      const feedbackPersonArray = feedbackPerson.split('-')
      const ruleForm = {
        eventHandleCode,
        eventName,
        eventType,
        designatorName: JSON.parse(localStorage.getItem(local.USER)).name,
        feedbackPerson: feedbackPersonArray[0],
        feedbackPersonName: feedbackPersonArray[1]
      }
      const { resultCode, data } = await webapi({
        url: '/event/api/eventHandle/addEventHandle ',
        data: {
          ...ruleForm,
          eventInfoId: state.handleDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('handleDateVisibleUpdate', false)
        dispatch('inquiry')
      }

    }
  }
}
