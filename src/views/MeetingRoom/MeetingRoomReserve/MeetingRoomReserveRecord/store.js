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
        { label: '未审核', value: '0' },
        { label: '通过', value: '1' },
        { label: '拒绝', value: '2' }
      ],
      ruleForm: {
        reserveInfoId: '',
        reserveObjectId: '',
        reserveObjectName: '',
        reserveType: '3',
        applyTime: '',
        applyUserId: userInfo.userId,
        applyUserName: userInfo.name,
        startTime: '',
        endTime: '',
        time: '',
        context: '',
        auditStatus: '0',
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
        context: '',
        auditStatus: '',
        remarks: '',
        reserveUser: []
      }
    },
    delDate: {
      currentInfoId: []
    },
    delDateBatch: {
      currentInfoId: []
    }
  },
  getters: {},
  mutations: {
    conditionsTimeDefault (state, ti) {
      state.conditionsForm.ruleForm.time = ti
    },
    conditionsRuleFormDictionaryTypeNameUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeName = val
    },
    conditionsRuleFormDictionaryTypeStatusUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeStatus = val
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
    editDateRuleFormReserveUserUpdate (state, infoIds) {
      state.editDate.ruleForm.reserveUser = infoIds
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
    },
    delDatecurrentInfoId (state, infoIds) {
      state.delDate.currentInfoId = infoIds
    },
    delDateBatchcurrentInfoId (state, infoIds) {
      state.delDateBatch.currentInfoId = infoIds
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
      const { userId } = JSON.parse(localStorage.getItem(local.USER))
      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/queryReserveByPage ',
        data: {
          applyUserId: userId,
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
      if (state) {
        commit('editCurrentInfoIdUpdate', { infoId })
        dispatch('editDetail', infoId)
      }
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
          applyTime: data.applyTime,
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
        auditStatus,
        reserveType,
        applyTime,
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
        auditStatus,
        reserveType,
        applyTime,
        applyUserId,
        applyUserName,
        startTime: startTime,
        endTime: endTime,
        context,
        remarks
      }
      reserveUser.forEach((item, index) => {
        const arr = item.split(' - ')
        ruleForm[`reserveUser[${index}].userName`] = arr[1]
        ruleForm[`reserveUser[${index}].userInfoId`] = arr[0]
      })

      const { resultCode, data } = await webapi({
        url: '/meeting/api/reserve/updateReserve ',
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
        url: '/meeting/api/reserve/delReserve ',
        data: {
          reserveInfoId: state.delDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        dispatch('inquiry')
      }
    },
    async delDateBatch ({ state, dispatch }) {
      if (state.delDateBatch.currentInfoId.length) {
        MessageBox.confirm('确认删除选中数据数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dispatch('delDateRequestBatch')
        })
      } else {
        Message({
          type: 'warning',
          message: '请选择要操作的数据！'
        })
      }
    },
    async delDateRequestBatch ({ state, dispatch }) {
      const { resultCode } = await webapi({
        url: '/meeting/api/reserve/delReserveBatch',
        data: {
          reserveInfoId: state.delDateBatch.currentInfoId
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
