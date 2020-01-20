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
        showroomName: '',
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
        reserveType: '2',
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
        reserveType: '2',
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
    editDateReset (state) {
      state.editDate.ruleForm = {
        reserveInfoId: '',
        reserveObjectId: '',
        reserveObjectName: '',
        reserveType: '2',
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
      const { resultCode, data } = await webapi({
        url: '/showroom/api/reserveInfo/getReserveShowroomList',
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
      !state && commit('editDateReset')
    },
    async editDetail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/showroom/api/reserveInfo/getReserveShowroomDetail',
        data: {
          reserveInfoId: infoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const reserveUser = data.reserveUser.map(item=>{
          return item.reserveUserId + ' - ' + item.userName
        })
        commit('editRuleFormUpdate', {
          reserveObjectId: data.reserveObjectId,
          reserveObjectName: data.showroomName,
          reserveType: '2',
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
          reserveObjectName: data.showroomName,
          reserveType: '2',
          applyUserId: data.applyUserId, 
          applyUserName: data.applyUserName,
          startTime: data.startTime,
          endTime: data.endTime,
          time: data.startTime + ' - ' + data.endTime,
          context: data.context,
          applyTime: data.applyTime,
          auditStatus: data.auditStatus,
          remarks: data.remarks,
          reserveUser: data.reserveUser
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
        url: '/showroom/api/reserveInfo/updateReserveShowroom',
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
        url: '/showroom/api/reserveInfo/delReserveShowroom',
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
        url: '/showroom/api/reserveInfo/delBatchReserveShowroom',
        data: {
          reserveInfoId: state.delDateBatch.currentInfoId  //state.delDate.currentInfoId
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
