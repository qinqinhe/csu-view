import webapi from '@/api/http'
import { code, addressImage } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    conditionsForm: {
      ruleForm: {
        inspectPlanName: '',
        planExecutorUserName: '',
        inspectRecordStatus: ''
      },
      inspectRecordStatusSelect: [
        {
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '未完成'
        }, {
          value: '1',
          label: '已完成'
        }
      ]
    },
    pagination: {
      pageCurrent: 1,
      pageRows: 10,
      total: 0
    },
    tableData: [],
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
    picture: {
      status: false,
      current: 0,
      list: []
    }

  },
  getters: {},
  mutations: {
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
    detailDateVisibleUpdate (state, sta) {
      state.detailDate.visible = sta
    },
    detailDateUpdate (state, data) {
      state.detailDate.ruleForm = data
    },
    detailCurrentInfoIdUpdate (state, infoId) {
      state.detailDate.currentInfoId = infoId
    },
    pictureStatusUpdate (state, status) {
      state.picture.status = status
    },
    pictureListUpdate (state, list) {
      state.picture.list = list
    },
    pictureCurrenUpdate (state, index) {
      state.picture.current = index
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
        url: '/inspect/api/inspectRecord/getInspectRecordInfoList',
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
    async detailDetail ({ commit, state }, infoId) {
      const { resultCode, data } = await webapi({
        url: '/inspect/api/inspectRecord/getInspectRecordInfoDetail ',
        data: {
          inspectRecordInfoId: infoId
        }
      })
      if (resultCode === code.CODE_SUCCESS) {
        const {
          inspectRecordCode,
          inspectPlanName,
          planExecutorUserName,
          inspectRecordStatus,
          inspectEductInfo,
          inspectPlanExecuteStartTime,
          inspectPlanExecuteEndTime
        } = data
        const ruleForm = {
          inspectRecordCode,
          inspectPlanName,
          planExecutorUserName,
          inspectRecordStatus,
          inspectPlanExecuteStartTime,
          inspectPlanExecuteEndTime,
          inspectEductInfo: inspectEductInfo.map(item => {
            
            item.images = item.images.map(itemImg => addressImage + itemImg)

            return item
          })
        }
        commit('detailDateUpdate', ruleForm)
      }
    },
    detailDateVisibleUpdate ({ commit, dispatch }, { state, infoId }) {
      commit('detailDateVisibleUpdate', state)
      if (state) {
        commit('detailCurrentInfoIdUpdate', infoId)
        dispatch('detailDetail', infoId)
      }
    },
    carryOutOperation ({ commit, dispatch }, infoId) {
      MessageBox.confirm('确认巡检已完成', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          dispatch('carryOutRequest', infoId)
        })
    },
    async carryOutRequest ({ state, dispatch }, infoId) {
      const { resultCode } = await webapi({
        url: '/inspect/api/inspectRecord/updateInspectRecordInfo',
        data: {
          inspectRecordInfoId: infoId,
          inspectRecordStatus: '1'
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
    pictureStatusUpdate ({ commit }, status) {
      commit('pictureStatusUpdate', status)
    },
    pictureListUpdate ({ commit }, list) {
      commit('pictureListUpdate', list)
    },
    pictureCurrenUpdate ({ commit }, index) {
      commit('pictureCurrenUpdate', index)
    }
  }
}
