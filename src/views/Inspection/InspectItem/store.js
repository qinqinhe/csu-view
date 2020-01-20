import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        inspectItemCode: '',
        inspectItemStatus: ''
      },
      inspectItemStatusSelect: [
        {
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '启用'
        }, {
          value: '1',
          label: '禁用'
        }
      ]
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
        inspectItemCode: '',
        inspectItemContent: '',
        inspectItemSort: '',
        remarks: ''
      },
      rules: {
        inspectItemCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectItemContent: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectItemSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      inspectItemStatusSelect: [{
        value: '0',
        label: '启用'
      }, {
        value: '1',
        label: '禁用'
      }]
    },
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectItemCode: '',
        inspectItemContent: '',
        inspectItemSort: '',
        remarks: ''
      },
      rules: {
        inspectItemCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectItemContent: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectItemSort: [
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
    addDateVisibleUpdate (state, sta) {
      state.addDate.visible = sta
    },
    addDateReset (state) {
      state.addDate.ruleForm = {
        inspectItemCode: '',
        inspectItemContent: '',
        inspectItemSort: '',
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
        inspectItemCode: '',
        inspectItemContent: '',
        inspectItemSort: '',
        remarks: ''
      }
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
        url: '/inspect/api/inspectItem/queryByPage',
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
      
      
      const infoIds = arr.map(item => item.inspectItemInfoId)
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
    async addsubmitForm ({ commit, state, dispatch }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectItem/addInspectItem ',
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
        url: '/inspect/api/inspectItem/queryByInspectItemInfoId',
        data: {
          inspectItemInfoId: state.editDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          inspectItemCode,
          inspectItemContent,
          inspectItemSort,
          remarks
        } = data
        commit('editDateUpdate', {
          inspectItemCode,
          inspectItemContent,
          inspectItemSort,
          remarks
        })
      }
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectItem/updateInspectItem',
        data: {
          ...state.editDate.ruleForm,
          inspectItemInfoId: state.editDate.currentInfoId
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
        url: '/inspect/api/inspectItem/deleteInspectItem',
        data: {
          inspectItemInfoId: state.delDate.currentInfoId
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
