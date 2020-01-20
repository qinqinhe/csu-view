import webapi from '@/api/http'
import { code, local } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        reviewerName: '',
        maintaincePersonName: '',
        auditResult: ''
      },
      auditResultSelect: [
        { value: '', label: '所有' },
        { value: '0', label: '不通过' },
        { value: '1', label: '通过' },
        { value: '2', label: '未审核' }
      ]
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    auditResult: [
      { value: '0', label: '不通过' },
      { value: '1', label: '通过' }
    ],
    tableData: [],
    maintainDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        eventHandleId: '',
        maintainceInfoCode: '',
        startTime: '',
        endTime: '',
        description: '',
        maintaincePerson: '',
        maintaincePersonName: '',
        addListTotalwarning: false,
        maintainceLists: []
      },
      rules: {
        auditResult: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
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
    delDate: {
      currentInfoId: []
    }
  },
  getters: {},
  mutations: {
    tableDataUpdate (state, arr) {
      state.tableData = arr
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
    delDatecurrentInfoId (state, infoIds) {
      state.delDate.currentInfoId = infoIds
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
        url: '/event/api/maintainceInfo/queryByPage',
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
    async detail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/event/api/maintainceInfo/queryDetailByMaintainceInfoId',
        data: {
          maintainceInfoId: infoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          eventHandleId,
          maintainceInfoCode,
          startTime,
          endTime,
          description,
          maintaincePerson,
          maintaincePersonName,
          reviewerName,
          maintainceListDetails
        } = data
        const ruleForm = {
          eventHandleId,
          maintainceInfoCode,
          startTime,
          endTime,
          description,
          maintaincePerson,
          maintaincePersonName,
          reviewerName,
          maintainceLists: maintainceListDetails
        }
        commit('maintainDateUpdate', ruleForm)
        commit('detailDateUpdate', ruleForm)
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
        dispatch('detail', infoId)
      }
    },
    async maintainSubmitForm ({ commit, state, dispatch }) {
      const {
        eventHandleId,
        auditResult
      } = state.maintainDate.ruleForm
      const userInfoId = JSON.parse(localStorage.getItem(local.USER))
      const { userId, name } = userInfoId
      const ruleForm = {
        eventHandleId,
        auditResult,
        reviewer: userId,
        reviewerName: name
      }
      const { resultCode, data } = await webapi({
        url: '/event/api/maintainceInfo/maintenanceAudit',
        data: {
          ...ruleForm,
          maintainceInfoId: state.maintainDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('maintainDateVisibleUpdate', false)
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
    delDateOperation ({ commit, dispatch }, infoId) {
      MessageBox.confirm('确认删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commit('delDatecurrentInfoId', infoId)
        dispatch('delDateRequest')
      })
    },
    async delDateRequest ({ state, dispatch }) {
      const { resultCode } = await webapi({
        url: '/event/api/maintainceInfo/deleteMaintainceInfo',
        data: {
          maintainceInfoId: state.delDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        dispatch('inquiry')
      }
    }
  }
}
