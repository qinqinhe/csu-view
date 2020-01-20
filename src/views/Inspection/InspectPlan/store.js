import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        inspectPlanName: '',
        inspectPlanStatus: ''
      },
      inspectPlanStatusSelect: [
        { value: '', label: '所有' },
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
    },
    inspectPlanStatus: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' }
    ],
    inspectLine: [],
    planExecutor: [],
    pickerOptions: {
      disabledDate: time => {
        const curDate = Date.now()
        return time.getTime() < curDate
      }
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
    addDate: {
      visible: false,
      ruleForm: {
        inspectPlanCode: '',
        inspectPlanName: '',
        inspectItemSort: '',
        inspectPlanStatus: '',
        inspectLineInfoId: '',
        inspectPlanExecuteTime: '',
        inspectPlanExecuteStartTime: '',
        inspectPlanExecuteEndTime: '',
        validPeriod: '',
        inspectPeriod: '',
        remarks: '',
        addListTotalwarning: false,
        inspectPlanExecutorAddVo: [
          {
            inspectPlanExecutorCode: '',
            planExecutor: '',
            planExecutorUserId: '',
            planExecutorUserName: '',
            planExecutorSort: '',
            remarks: ''
          }
        ]
      },
      rules: {
        inspectPlanCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectPlanName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectItemSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        inspectPlanStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        inspectLineInfoId: [
          { required: true, message: '请选择巡检路线', trigger: 'change' }
        ],
        inspectPlanExecuteTime: [
          { required: true, message: '请选择执行时间', trigger: 'change' }
        ],
        validPeriod: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        inspectPeriod: [
          { required: true, message: '请输入巡检周期', trigger: 'blur' }
        ],
        inspectPlanExecutorCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        planExecutor: [
          { required: true, message: '请选择巡检人', trigger: 'change' }
        ],
        planExecutorSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      inspectItemStatusSelect: [
        {
          value: '0',
          label: '启用'
        }, {
          value: '1',
          label: '禁用'
        }
      ]
    },
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectPlanCode: '',
        inspectPlanName: '',
        inspectItemSort: '',
        inspectPlanStatus: '',
        inspectPlanExecuteTime: '',
        inspectPlanExecuteStartTime: '',
        inspectPlanExecuteEndTime: '',
        validPeriod: '',
        inspectPeriod: '',
        remarks: '',
        addListTotalwarning: false,
        inspectPlanExecutorAddVo: [
          {
            inspectPlanExecutorCode: '',
            planExecutorUserId: '',
            planExecutorUserName: '',
            planExecutorSort: '',
            remarks: ''
          }
        ]
      },
      rules: {
        inspectPlanCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectPlanName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectItemSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        inspectPlanStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        inspectLineInfoId: [
          { required: true, message: '请选择巡检路线', trigger: 'change' }
        ],
        inspectPlanExecuteTime: [
          { required: true, message: '请选择执行时间', trigger: 'change' }
        ],
        validPeriod: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        inspectPeriod: [
          { required: true, message: '请输入巡检周期', trigger: 'blur' }
        ],
        inspectPlanExecutorCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        planExecutor: [
          { required: true, message: '请选择巡检人', trigger: 'change' }
        ],
        planExecutorSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      dictionaryTypeStatusSelect: [{
        value: '0',
        label: '停用'
      }, {
        value: '1',
        label: '正常'
      }]
    },
    detailDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectPlanCode: '',
        inspectPlanName: '',
        inspectItemSort: '',
        inspectPlanStatus: '',
        inspectLineInfoId: '',
        inspectPlanExecuteTime: '',
        inspectPlanExecuteStartTime: '',
        inspectPlanExecuteEndTime: '',
        validPeriod: '',
        inspectPeriod: '',
        remarks: '',
        addListTotalwarning: false,
        inspectPlanExecutorAddVo: []
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
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    inspectLineSet (state, array) {
      state.inspectLine = array
    },
    planExecutorSet (state, array) {
      state.planExecutor = array
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
    addDatedelTemplate (state, index) {
      state.addDate.ruleForm.inspectPlanExecutorAddVo.splice(index, 1)
    },
    addDateAddTemplate (state) {
      state.addDate.ruleForm.inspectPlanExecutorAddVo.push({
        inspectPlanExecutorCode: '',
        planExecutor: '',
        planExecutorUserId: '',
        planExecutorUserName: '',
        planExecutorSort: ''
      })
    },
    addListTotalwarningUpdate (state, sta) {
      state.addDate.ruleForm.addListTotalwarning = sta
    },
    addDateVisibleUpdate (state, sta) {
      state.addDate.visible = sta
    },
    addDateReset (state) {
      state.addDate.ruleForm = {
        inspectPlanCode: '',
        inspectPlanName: '',
        inspectItemSort: '',
        inspectPlanStatus: '',
        inspectLineInfoId: '',
        inspectPlanExecuteState: '',
        inspectPlanExecuteTime: '',
        inspectPlanExecuteStartTime: '',
        inspectPlanExecuteEndTime: '',
        validPeriod: '',
        inspectPeriod: '',
        remarks: '',
        inspectPlanExecutorAddVo: []
      }
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
      state.addDate.ruleForm = {
        inspectPlanCode: '',
        inspectPlanName: '',
        inspectItemSort: '',
        inspectPlanStatus: '',
        inspectLineInfoId: '',
        inspectPlanExecuteState: '',
        inspectPlanExecuteTime: '',
        inspectPlanExecuteStartTime: '',
        inspectPlanExecuteEndTime: '',
        validPeriod: '',
        inspectPeriod: '',
        remarks: '',
        inspectPlanExecutorAddVo: []
      }
    },
    editDatedelTemplate (state, index) {
      state.editDate.ruleForm.inspectPlanExecutorAddVo.splice(index, 1)
    },
    editDateAddTemplate (state) {
      state.editDate.ruleForm.inspectPlanExecutorAddVo.push({
        inspectPlanExecutorCode: '',
        planExecutor: '',
        planExecutorUserId: '',
        planExecutorUserName: '',
        planExecutorSort: ''
      })
    },
    editListTotalwarningUpdate (state, sta) {
      state.editDate.ruleForm.addListTotalwarning = sta
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
    },
    delDateBatchcurrentInfoId (state, infoIds) {
      state.delDateBatch.currentInfoId = infoIds
    }
  },
  actions: {
    async inquiry ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectPlan/getInspectPlanList',
        data: {
          ...state.pagination,
          ...state.conditionsForm.ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const { rowSum, rows } = data
        commit('tableDataUpdate', rows.map(item => {
          const currentDate = new Date().getTime()
          const validPeriodDate = new Date(item.validPeriod).getTime()
          item.expired = currentDate > validPeriodDate
          return item
        }))
        commit('paginationTotalChange', rowSum)
      }
    },
    async inspectLine ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectLine/queryInspectLineList'
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('inspectLineSet', data)
      }
    },
    async planExecutorSet ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '3'
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('planExecutorSet', data)
      }
    },
    handleSelectionChange ({ commit }, arr) {
      
      const infoIds = arr.map(item => item.inspectPlanId)
      
      
      
      commit('delDateBatchcurrentInfoId', infoIds.join())
    },
    addDateVisibleUpdate ({ commit }, sta) {
      commit('addDateVisibleUpdate', sta)
    },
    paginationSizeChange ({ commit, dispatch }, size) {
      commit('paginationSizeChange', size)
      dispatch('inquiry')
    },
    paginationCurrentChange ({ commit, dispatch }, current) {
      commit('paginationCurrentChange', current)
      dispatch('inquiry')
    },
    addDatedelTemplate ({ commit, state }, index) {
      commit('addDatedelTemplate', index)
    },
    addDateAddTemplate ({ commit }) {
      commit('addDateAddTemplate')
      commit('addListTotalwarningUpdate', false)
    },
    addListTotalwarningUpdate ({ commit }, sta) {
      commit('addListTotalwarningUpdate', sta)
    },
    async addsubmitForm ({ commit, state, dispatch }) {
      const {
        inspectPlanCode,
        inspectPlanName,
        inspectItemSort,
        inspectPlanStatus,
        inspectLineInfoId,
        inspectPlanExecuteTime,
        validPeriod,
        inspectPeriod,
        remarks,
        inspectPlanExecutorAddVo
      } = state.addDate.ruleForm
      const ruleForm = {
        inspectPlanCode,
        inspectPlanName,
        inspectItemSort,
        inspectPlanStatus,
        inspectLineInfoId,
        inspectPlanExecuteTime,
        inspectPlanExecuteStartTime: inspectPlanExecuteTime[0],
        inspectPlanExecuteEndTime: inspectPlanExecuteTime[1],
        validPeriod,
        inspectPeriod,
        remarks
      }
      inspectPlanExecutorAddVo.forEach((item, index) => {
        const planExecutor = item.planExecutor.split('-')
        ruleForm[`inspectPlanExecutorAddVo[${index}].inspectPlanExecutorCode`] = item.inspectPlanExecutorCode
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorUserId`] = planExecutor[0]
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorUserName`] = planExecutor[1]
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorSort`] = item.planExecutorSort
        ruleForm[`inspectPlanExecutorAddVo[${index}].remarks`] = item.remarks
      })
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectPlan/addInspectPlan',
        data: {
          ...ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('addDateVisibleUpdate', false)
        dispatch('inquiry')
        commit('addDateReset')
      }

    },
    editDateVisibleOpen ({ commit, dispatch }, { state, infoId }) {
      commit('editDateVisibleUpdate', state)
      commit('editCurrentInfoIdUpdate', infoId)
      dispatch('editDetail', infoId)
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async editDetail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectPlan/getInspectPlanDetail',
        data: {
          inspectPlanId: infoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          inspectPlanCode,
          inspectPlanName,
          inspectItemSort,
          inspectPlanStatus,
          inspectLineInfoId,
          inspectPlanExecuteStartTime,
          inspectPlanExecuteEndTime,
          validPeriod,
          inspectPeriod,
          remarks,
          inspectPlanExecutorVo
        } = data
        const ruleForm = {
          inspectPlanCode,
          inspectPlanName,
          inspectItemSort,
          inspectPlanStatus,
          inspectLineInfoId,
          inspectPlanExecuteTime: [inspectPlanExecuteStartTime, inspectPlanExecuteEndTime],
          inspectPlanExecuteStartTime,
          inspectPlanExecuteEndTime,
          validPeriod,
          inspectPeriod,
          remarks,
          addListTotalwarning: false,
          inspectPlanExecutorAddVo: inspectPlanExecutorVo.map(item => {
            item.planExecutor = item.planExecutorUserId + '-' + item.planExecutorUserName
            return item
          })
        }
        commit('editDateUpdate', ruleForm)
        commit('detailDateUpdate', ruleForm)
      }
    },
    editDatedelTemplate ({ commit, state }, index) {
      commit('editDatedelTemplate', index)
    },
    editDateAddTemplate ({ commit }) {
      commit('editDateAddTemplate')
      commit('editListTotalwarningUpdate', false)
    },
    editListTotalwarningUpdate ({ commit }, sta) {
      commit('editListTotalwarningUpdate', sta)
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const {
        inspectPlanCode,
        inspectPlanName,
        inspectItemSort,
        inspectPlanStatus,
        inspectLineInfoId,
        inspectPlanExecuteTime,
        validPeriod,
        inspectPeriod,
        remarks,
        inspectPlanExecutorAddVo
      } = state.editDate.ruleForm
      const ruleForm = {
        inspectPlanCode,
        inspectPlanName,
        inspectItemSort,
        inspectPlanStatus,
        inspectLineInfoId,
        
        inspectPlanExecuteStartTime: inspectPlanExecuteTime[0],
        inspectPlanExecuteEndTime: inspectPlanExecuteTime[1],
        validPeriod,
        inspectPeriod,
        remarks
      }
      inspectPlanExecutorAddVo.forEach((item, index) => {
        const planExecutor = item.planExecutor.split('-')
        ruleForm[`inspectPlanExecutorAddVo[${index}].inspectPlanExecutorCode`] = item.inspectPlanExecutorCode
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorUserId`] = planExecutor[0]
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorUserName`] = planExecutor[1]
        ruleForm[`inspectPlanExecutorAddVo[${index}].planExecutorSort`] = item.planExecutorSort
        ruleForm[`inspectPlanExecutorAddVo[${index}].remarks`] = item.remarks
      })
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectPlan/updateInspectPlan',
        data: {
          ...ruleForm,
          inspectPlanId: state.editDate.currentInfoId
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
        dispatch('editDetail', infoId)
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
        url: '/inspect/api/inspectPlan/delInspectPlan',
        data: {
          inspectPlanId: state.delDate.currentInfoId
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
        url: '/inspect/api/inspectItem/deleteByInspectItemInfoIdArray ',
        data: {
          inspectItemInfoIdArray: state.delDateBatch.currentInfoId  //state.delDate.currentInfoId
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
