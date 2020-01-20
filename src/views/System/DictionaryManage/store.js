import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        dictionaryTypeName: '',
        dictionaryTypeStatus: ''
      },
      dictionaryTypeStatusSelect: [
        {
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '停用'
        }, {
          value: '1',
          label: '正常'
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
        dictionaryTypeCode: '',
        dictionaryTypeName: '',
        remarks: '',
        dictionaryDataInfoAddVoList: [],
        addListTotalwarning: false
      },
      rules: {
        dictionaryTypeCode: [
          { required: true, message: '请输入字典编码', trigger: 'blur' }
        ],
        dictionaryTypeName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dictionaryValue: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dictionaryCode: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dictionaryDataStatus: [
          { required: true, message: '12121', trigger: 'change' }
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
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        dictionaryTypeCode: '',
        dictionaryTypeName: '',
        remarks: '',
        dictionaryDataInfoAddVoList: [],
        addListTotalwarning: false
      },
      rules: {
        dictionaryTypeCode: [
          { required: true, message: '请输入字典编码', trigger: 'blur' }
        ],
        dictionaryTypeName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dictionaryValue: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dictionaryCode: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dictionaryDataStatus: [
          { required: true, message: '12121', trigger: 'change' }
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
    conditionsRuleFormDictionaryTypeNameUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeName = val
    },
    conditionsRuleFormDictionaryTypeStatusUpdate (state, val) {
      state.conditionsForm.ruleForm.dictionaryTypeStatus = val
    },
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    addDateVisibleUpdate (state, sta) {
      state.addDate.visible = sta
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
      state.addDate.ruleForm.dictionaryDataInfoAddVoList.splice(index, 1)
    },
    addDateAddTemplate (state) {
      state.addDate.ruleForm.dictionaryDataInfoAddVoList.push({
        dictionaryValue: '',
        dictionaryCode: '',
        dictionaryDataStatus: '',
        remarks: ''
      })
    },
    addListTotalwarningUpdate (state, sta) {
      state.addDate.ruleForm.addListTotalwarning = sta
    },
    addDateReset (state) {
      state.addDate.ruleForm = {
        dictionaryTypeCode: '',
        dictionaryTypeName: '',
        remarks: '',
        dictionaryDataInfoAddVoList: [],
        addListTotalwarning: false
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
        dictionaryTypeCode: '',
        dictionaryTypeName: '',
        remarks: '',
        dictionaryDataInfoAddVoList: [],
        addListTotalwarning: false
      }
    },
    editListTotalwarningUpdate (state, sta) {
      state.editDate.ruleForm.addListTotalwarning = sta
    },
    editDatedelTemplate (state, index) {
      state.editDate.ruleForm.dictionaryDataInfoAddVoList.splice(index, 1)
    },
    editDateAddTemplate (state) {
      state.editDate.ruleForm.dictionaryDataInfoAddVoList.push({
        dictionaryValue: '',
        dictionaryCode: '',
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
    conditionsRuleFormDictionaryTypeNameUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeNameUpdate', val)
    },
    conditionsRuleFormDictionaryTypeStatusUpdate ({ commit }, val) {
      commit('conditionsRuleFormDictionaryTypeStatusUpdate', val)
    },
    async inquiry ({ commit, state }) {
      const { resultCode, data } =
        await webapi({
          url: '/system/api/dictionaryType/queryDictionaryTypeByPage',
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
      const infoIds = arr.map(item => item.dictionaryTypeInfoId)
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
      const {
        dictionaryTypeCode,
        dictionaryTypeName,
        remarks,
        dictionaryDataInfoAddVoList
      } = state.addDate.ruleForm

      let ruleForm = {
        dictionaryTypeCode,
        dictionaryTypeName,
        remarks
      }
      dictionaryDataInfoAddVoList.forEach((item, index) => {
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryValue`] = item.dictionaryValue
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryCode`] = item.dictionaryCode
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryDataStatus`] = item.dictionaryDataStatus
        ruleForm[`dictionaryDataInfoAddVoList[${index}].remarks`] = item.remarks
      })

      const { resultCode, data } = await webapi({
        url: '/system/api/dictionaryType/addDictionaryType',
        data: {
          ...ruleForm
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        Message({
          type: 'success',
          message: '操作成功!'
        })
        commit('addDateReset')
        commit('addDateVisibleUpdate', false)
        dispatch('inquiry')
      }

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
    editDateVisibleOpen ({ commit, dispatch }, { state, infoId }) {
      commit('editDateVisibleUpdate', state)
      commit('editCurrentInfoIdUpdate', infoId)
      dispatch('dictionaryTypeDetail')
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async dictionaryTypeDetail ({ commit, state }) {
      const { resultCode, data } =
        await webapi({
          url: '/system/api/dictionaryType/queryDetail',
          data: {
            dictionaryTypeInfoId: state.editDate.currentInfoId
          }
        })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          dictionaryTypeCode,
          dictionaryTypeName,
          remarks,
          dictionaryDataDetailList
        } = data
        commit('editDateUpdate', {
          dictionaryTypeCode,
          dictionaryTypeName,
          remarks,
          dictionaryDataInfoAddVoList: dictionaryDataDetailList,
          addListTotalwarning: false
        })
      }
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const {
        dictionaryTypeCode,
        dictionaryTypeName,
        remarks,
        dictionaryDataInfoAddVoList
      } = state.editDate.ruleForm

      let ruleForm = {
        dictionaryTypeCode,
        dictionaryTypeName,
        remarks
      }
      dictionaryDataInfoAddVoList.forEach((item, index) => {
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryValue`] = item.dictionaryValue
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryCode`] = item.dictionaryCode
        ruleForm[`dictionaryDataInfoAddVoList[${index}].dictionaryDataStatus`] = item.dictionaryDataStatus
        ruleForm[`dictionaryDataInfoAddVoList[${index}].remarks`] = item.remarks
      })
      console.log(ruleForm)
      const { resultCode, data } = await webapi({
        url: '/system/api/dictionaryType/updateDictionaryType',
        data: {
          ...ruleForm,
          dictionaryTypeInfoId: state.editDate.currentInfoId
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
    editListTotalwarningUpdate ({ commit }, sta) {
      commit('editListTotalwarningUpdate', sta)
    },
    editDatedelTemplate ({ commit, state }, index) {
      commit('editDatedelTemplate', index)
    },
    editDateAddTemplate ({ commit }) {
      commit('editDateAddTemplate')
      commit('editListTotalwarningUpdate', false)
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
        url: '/system/api/dictionaryType/deleteDictionaryType ',
        data: {
          dictionaryTypeInfoId: state.delDate.currentInfoId
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
        url: '/system/api/dictionaryType/deleteByDictionaryTypArray',
        data: {
          dictionaryTypeInfoIdArray: state.delDateBatch.currentInfoId  //state.delDate.currentInfoId
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
