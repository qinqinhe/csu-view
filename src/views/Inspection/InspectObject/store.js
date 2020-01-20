import webapi from '@/api/http'
import { code, dictionary } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    dictionary: {
      inspect_object_type: [],
      inspectObjectBelong: []
    },
    inspectRoom: [],
    inspectDevice: [],
    inspectItem: [],
    conditionsForm: {
      ruleForm: {
        inspectObjectName: '',
        inspectObjectCode: '',
        inspect_object_type: '',
        inspectObjectBelong: ''
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
        inspectObjectCode: '',
        inspectObjectName: '',
        inspectObjectSort: '',
        inspectObjectType: '',
        inspectObjectId: '',
        inspectRoomId: '',
        inspectDeviceId: '',
        inspectDeviceLoad: false,
        inspectObjectBelong: '',
        inspectItemInfoIdArray: [],
        remarks: ''
      },
      rules: {
        inspectObjectCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        inspectObjectName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        inspectObjectSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        inspectObjectType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        inspectRoomId: [
          { required: true, message: '请选择房间', trigger: 'change' }
        ],
        inspectDeviceId: [
          { required: true, message: '请选择设备', trigger: 'change' }
        ],
        inspectObjectBelong: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ]
      }
    },
    editDate: {
      visible: false,
      currentInfoId: '',
      ruleForm: {
        inspectObjectCode: '',
        inspectObjectName: '',
        inspectObjectSort: '',
        inspectObjectType: '',
        inspectObjectId: '',
        inspectRoomId: '',
        inspectDeviceId: '',
        inspectDeviceLoad: false,
        inspectObjectBelong: '',
        inspectItemInfoIdArray: [],
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
      }]
    },
    delDate: {
      currentInfoId: []
    },
    delDateBatch: {
      currentInfoId: []
    }
  },
  getters: {
    inspect_object_typeAll: (state) => {
      return [
        { dictionaryDataInfoId: '', dictionaryValue: '', remarks: '所有' },
        ...state.dictionary.inspect_object_type
      ]
    },
    inspectObjectBelongAll: (state) => {
      return [
        { dictionaryDataInfoId: '', dictionaryValue: '', remarks: '所有' },
        ...state.dictionary.inspectObjectBelong
      ]
    }
  },
  mutations: {
    dictionaryInspect_object_typeSet (state, array) {
      state.dictionary.inspect_object_type = array
    },
    dictionaryInspectObjectBelong (state, array) {
      state.dictionary.inspectObjectBelong = array
    },
    tableDataUpdate (state, arr) {
      state.tableData = arr
    },
    inspectRoomSet (state, arr) {
      state.inspectRoom = arr
    },
    inspectDeviceSet (state, arr) {
      state.inspectDevice = arr
    },
    inspectItemSet (state, array) {
      state.inspectItem = array
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
    addDateRuleFormInspectDeviceLoad (state, sta) {
      state.addDate.ruleForm.inspectDeviceLoad = sta
    },
    addDateReset (state) {
      state.addDate.ruleForm = {
        inspectObjectCode: '',
        inspectObjectName: '',
        inspectObjectSort: '',
        inspectObjectType: '',
        inspectObjectId: '',
        inspectRoomId: '',
        inspectDeviceId: '',
        inspectDeviceLoad: false,
        inspectObjectBelong: '',
        inspectItemInfoIdArray: [],
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
        inspectObjectCode: '',
        inspectObjectName: '',
        inspectObjectSort: '',
        inspectObjectType: '',
        inspectObjectId: '',
        inspectRoomId: '',
        inspectDeviceId: '',
        inspectDeviceLoad: false,
        inspectObjectBelong: '',
        inspectItemInfoIdArray: [],
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
    async dictionaryType ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/system/api/dictionaryType/queryDictionaryByDictionaryTypeCodeArray',
        data: {
          dictionaryTypeCodeArray: `${dictionary.inspect_object_type.code},${dictionary.inspect_object_belong.code}`
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        data.forEach(item => {
          if (item.dictionaryTypeCode === dictionary.inspect_object_type.code) {
            commit('dictionaryInspect_object_typeSet', item.dictionaryTypeListValueList)
          } else if (item.dictionaryTypeCode === dictionary.inspect_object_belong.code) {
            commit('dictionaryInspectObjectBelong', item.dictionaryTypeListValueList)
          }
        })
      }
    },
    async inquiry ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/queryByPage',
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
    async inspectRoomSet ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/queryInspectRoom'
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('inspectRoomSet', data)
      }
    },
    async inspectDeviceSet ({ commit, state }, val) {
      if (val) {
        commit('addDateRuleFormInspectDeviceLoad', true)
        const { resultCode, data } = await webapi({
          url: '/system/api/device/getDeviceInfos',
          data: {
            deviceName: val
          }
        })
        commit('addDateRuleFormInspectDeviceLoad', false)
        if (resultCode === code.CODE_SUCCESS) {
          commit('inspectDeviceSet', data)
        }
      }
    },
    async inspectItemSet ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/queryEnableInspectItem'
      })
      if (resultCode === code.CODE_SUCCESS) {
        commit('inspectItemSet', data)
      }
    },
    handleSelectionChange ({ commit }, arr) {
      const infoIds = arr.map(item => item.inspectObjectInfoId)
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
        inspectObjectCode,
        inspectObjectName,
        inspectObjectSort,
        inspectObjectType,
        inspectRoomId,
        inspectDeviceId,
        inspectObjectBelong,
        inspectItemInfoIdArray,
        remarks
      } = state.addDate.ruleForm
      const ruleForm = {
        inspectObjectCode,
        inspectObjectName,
        inspectObjectSort,
        inspectObjectType,
        inspectObjectBelong,
        inspectItemInfoIdArray,
        remarks
      }
      if (inspectObjectType === '1') {
        ruleForm.inspectObjectId = inspectRoomId
      } else if (inspectObjectType === '2') {
        ruleForm.inspectObjectId = inspectDeviceId
      }
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/addInspectObject',
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
      dispatch('editDetail')
    },
    editDateVisibleUpdate ({ commit }, state) {
      commit('editDateVisibleUpdate', state)
    },
    async editDetail ({ commit, state }) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/queryDetailByInspectObjectInfoId',
        data: {
          inspectObjectInfoId: state.editDate.currentInfoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          inspectObjectCode,
          inspectObjectName,
          inspectObjectSort,
          inspectObjectType,
          inspectObjectId,
          inspectObjectBelong,
          inspectItemDetailList,
          remarks
        } = data
        commit('editDateUpdate', {
          inspectObjectCode,
          inspectObjectName,
          inspectObjectSort,
          inspectObjectType,
          inspectRoomId: inspectObjectType === '1' ? inspectObjectId : '',
          inspectDeviceId: inspectObjectType === '2' ? inspectObjectId : '',
          inspectObjectId: '',
          inspectObjectBelong,
          inspectItemInfoIdArray: inspectItemDetailList.map(item => item.inspectItemInfoId),
          remarks
        })
      }
    },
    async editsubmitForm ({ commit, state, dispatch }) {
      const {
        inspectObjectCode,
        inspectObjectName,
        inspectObjectSort,
        inspectObjectType,
        inspectRoomId,
        inspectDeviceId,
        inspectObjectBelong,
        inspectItemInfoIdArray,
        remarks
      } = state.editDate.ruleForm
      const ruleForm = {
        inspectObjectCode,
        inspectObjectName,
        inspectObjectSort,
        inspectObjectType,
        inspectObjectBelong,
        inspectItemInfoIdArray,
        remarks
      }
      if (inspectObjectType === '1') {
        ruleForm.inspectObjectId = inspectRoomId
      } else if (inspectObjectType === '2') {
        ruleForm.inspectObjectId = inspectDeviceId
      }
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectObject/updateInspectObject',
        data: {
          ...ruleForm,
          inspectObjectInfoId: state.editDate.currentInfoId
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
        url: '/inspect/api/inspectObject/deleteInspectObject',
        data: {
          inspectObjectInfoId: state.delDate.currentInfoId
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
        url: '/inspect/api/inspectObject/deleteByInspectObjectInfoIdArray',
        data: {
          inspectObjectInfoIdArray: state.delDateBatch.currentInfoId  //state.delDate.currentInfoId
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
