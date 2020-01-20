import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        inspectLineCode: '',
        inspectLineName: ''
      }
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
    inspectObjectInfoIdArraySelect: [],
    addDate: {
      visible: false,
      ruleForm: {
        inspectLineCode: '',
        inspectLineName: '',
        inspectLineSort: '',
        inspectObjectInfoIdArray: [],
        remarks: ''
      },
      rules: {
        inspectLineCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectLineName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectLineSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        inspectObjectType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        inspectObjectBelong: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        inspectObjectInfoIdArray: [
          {
            required: true, trigger: 'change', validator: (rule, value, callback) => {
              if (value.length) {
                callback()
              } else {
                callback(new Error('请选择巡检对象'))
              }
            }
          }
        ]
      }
    },
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectLineCode: '',
        inspectLineName: '',
        inspectLineSort: '',
        inspectObjectInfoIdArray: [],
        remarks: ''
      },
      rules: {
        inspectLineCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectLineName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectLineSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        inspectObjectInfoIdArray: [
          {
            required: true, trigger: 'change', validator: (rule, value, callback) => {
              if (value.length) {
                callback()
              } else {
                callback(new Error('请选择巡检对象'))
              }
            }
          }
        ]
      },
      inspectObjectTypeSelect: [{
        value: '1',
        label: '房间'
      }, {
        value: '2',
        label: '设备'
      }],
      inspectObjectBelongSelect: [{
        value: '1',
        label: '消防'
      }, {
        value: '2',
        label: '安防'
      }],
      inspectObjectInfoIdArraySelect: []
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
    paginationSizeChange (state, size) {
      state.pagination.pageRows = size
    },
    paginationCurrentChange (state, current) {
      state.pagination.pageCurrent = current
    },
    paginationTotalChange (state, total) {
      state.pagination.total = total
    },
    inspectObjectInfoIdArraySelectSet (state, array) {
      state.inspectObjectInfoIdArraySelect = array
    },
    addDateVisibleUpdate (state, sta) {
      state.addDate.visible = sta
    },
    addDateReset (state) {
      state.addDate.ruleForm = {
        inspectLineCode: '',
        inspectLineName: '',
        inspectLineSort: '',
        inspectObjectType: '',
        inspectObjectBelong: '',
        inspectObjectInfoIdArray: [],
        remarks: ''
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
        inspectLineCode: '',
        inspectLineName: '',
        inspectLineSort: '',
        inspectObjectInfoIdArray: [],
        remarks: ''
      }
    },
    editDatedelTemplate (state, index) {
      state.editDate.ruleForm.dictionaryDataInfoAddVoList.splice(index, 1)
    },
    editDateAddTemplate (state) {
      state.editDate.ruleForm.dictionaryDataInfoAddVoList.push({
        dictionaryValue: '',
        dictionarySort: '',
        dictionaryDataStatus: '',
        remarks: ''
      })
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
        url: '/inspect/api/inspectLine/queryInspectLineByPage',
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
    handleSelectionChange ({ commit }, arr) {
      const infoIds = arr.map(item => item.inspectLineInfoId)
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
    async inspectObjectInfoIdArraySelectSet ({ commit }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectLine/queryAllInspectObjects'
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('inspectObjectInfoIdArraySelectSet', data)
      }
    },
    async addsubmitForm ({ commit, state, dispatch }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectLine/addInspectLine',
        data: {
          ...state.addDate.ruleForm
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
      dispatch('editDetail')
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async editDetail ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectLine/queryDetail',
        data: {
          inspectLineInfoId: state.editDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          inspectLineCode,
          inspectLineName,
          inspectLineSort,
          inspectObjectType,
          inspectObjectBelong,
          inspectObjectQueryVoList,
          remarks
        } = data
        commit('editDateUpdate', {
          inspectLineCode,
          inspectLineName,
          inspectLineSort,
          inspectObjectInfoIdArray: inspectObjectQueryVoList.map(item => item.inspectObjectInfoId),
          remarks
        })
      }
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectLine/updateInspectLine',
        data: {
          ...state.editDate.ruleForm,
          inspectLineInfoId: state.editDate.currentInfoId
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
        url: '/inspect/api/inspectLine/deleteInspectLine',
        data: {
          inspectLineInfoId: state.delDate.currentInfoId
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
        url: '/inspect/api/inspectLine/deleteByInspectLineInfoIdArray',
        data: {
          inspectLineInfoIdArray: state.delDateBatch.currentInfoId  //state.delDate.currentInfoId
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
