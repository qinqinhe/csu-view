import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
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
        auditStatus: ''
      },
      auditStatusSelect: [
        { label: '所有', value: '' },
        { label: '未审核', value: '0' },
        { label: '通过', value: '1' },
        { label: '拒绝', value: '2' }
      ]
    },
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
      auditStatusSelect: [
        { label: '通过', value: '1' },
        { label: '拒绝', value: '2' }
      ],
      ruleForm: {
        reserveInfoId: '',
        reserveObjectId: '',
        reserveObjectName: '',
        reserveType: '3',
        applyUserId: userInfo.userId,
        applyUserName: userInfo.name,
        startTime: '',
        endTime: '',
        time: '',
        context: '',
        auditStatus: '',
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
    },
    detailDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        reserveInfoId: '',
        reserveObjectId: '',
        reserveObjectName: '',
        reserveType: '3',
        applyUserId: '',
        applyUserName: '',
        startTime: '',
        endTime: '',
        time: '',
        applyTime: '',
        reason: '',
        auditStatus: '',
        remarks: '',
        reserveUser: []
      }
    }
  },
  getters: {},
  mutations: {
    conditionsTimeDefault (state, ti) {
      state.conditionsForm.ruleForm.time = ti
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
    editCurrentInfoIdUpdate (state, { infoId }) {
      state.editDate.currentInfoId = infoId
    },
    editRuleFormUpdate (state, ruleForm) {
      state.editDate.ruleForm = ruleForm
    },
    editDateVisibleUpdate (state, sta) {
      state.editDate.visible = sta
    },
    editDateStudentsSet (state, arr) {
      state.editDate.students = arr
    },
    editDateUpdate (state, date) {
      state.editDate.ruleForm = date
    },
    detailDateVisibleUpdate (state, sta) {
      state.detailDate.visible = sta
    },
    detailCurrentInfoIdUpdate (state, { infoId, infoName }) {
      state.detailDate.currentInfoId = infoId
    },
    detailRuleFormUpdate (state, ruleForm) {
      state.detailDate.ruleForm = ruleForm
    }
  },
  actions: {
    async inquiry ({ commit, state }) {
      const { userId } = JSON.parse(localStorage.getItem(local.USER))
      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/queryAuditByPage ',
        data: {
          meetingRoomAdminUserId: userId,
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
      const infoIds = arr.map(item => item.reserveInfoId)
      commit('delDateBatchcurrentInfoId', infoIds.join())
    },
    paginationSizeChange ({ commit, dispatch }, size) {
      commit('paginationSizeChange', size)
      dispatch('inquiry')
    },
    paginationCurrentChange ({ commit, dispatch, state }, current) {
      commit('paginationCurrentChange', current)
      dispatch('inquiry')
    },
    editDateVisibleOpen ({ commit, dispatch }, { state, infoId }) {
      commit('editDateVisibleUpdate', state)
      commit('editCurrentInfoIdUpdate', { infoId })
      dispatch('editDetail', infoId)
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async editDetail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/queryReserveDetail ',
        data: {
          reserveInfoId: infoId
        }
      })
      const reserveUser = data.reserveUserList.map(item=>{
        return item.reserveUserId + ' - ' + item.userName
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('editRuleFormUpdate', {
          reserveObjectId: data.reserveObjectId,
          reserveObjectName: data.meetingRoomName,
          reserveType: '3',
          applyUserId: data.applyUserId, 
          applyUserName: data.applyUserName,
          startTime: data.startTime,
          endTime: data.endTime,
          time: data.startTime + ' - ' + data.endTime,
          context: data.context,
          auditStatus: data.auditStatus,
          remarks: data.remarks,
          reserveUser
        })
        commit('detailRuleFormUpdate', {
          reserveObjectId: data.reserveObjectId,
          reserveObjectName: data.meetingRoomName,
          reserveType: '3',
          applyUserId: data.applyUserId, 
          applyUserName: data.applyUserName,
          startTime: data.startTime,
          endTime: data.endTime,
          time: data.startTime + ' - ' + data.endTime,
          context: data.context,
          applyTime: data.applyTime,
          auditStatus: data.auditStatus,
          remarks: data.remarks,
          reserveUser: data.reserveUserList
        })
      }
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
        auditStatus,
        context,
        remarks,
        reserveUser
      } = state.editDate.ruleForm

      let ruleForm = {
        reserveObjectId,
        reserveType,
        auditUserId: applyUserId,
        auditUserName: applyUserName,
        startTime: startTime,
        endTime: endTime,
        auditStatus,
        context,
        remarks
      }
      reserveUser.forEach((item, index) => {
        const arr = item.split(' - ')
        ruleForm[`reserveUser[${index}].userName`] = arr[1]
        ruleForm[`reserveUser[${index}].userInfoId`] = arr[0]
      })

      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/updateReserveAudit ',
        data: {
          reserveInfoId: state.editDate.currentInfoId,
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
    },
    detailDateVisibleUpdate ({ commit }, state) {
      commit('detailDateVisibleUpdate')
    },
    detailDateVisibleOpen ({ commit, dispatch }, { state, infoId }) {
      commit('detailDateVisibleUpdate', state)
      commit('detailCurrentInfoIdUpdate', { infoId })
      dispatch('editDetail', infoId)
    }
  }
}
