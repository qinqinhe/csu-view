import webapi from '@/api/http'
import { code, dictionary, local } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
  namespaced: true,
  state: {
    data: [], // 原始数据
    treelist: [], // 展示数据
    currentDimension: 0, // 当前维度
    halfCheck: [], // 半选
    allCheck: [], // 全选
    treeCheck: [], // 选中的子节点
    childCheck: [], // 选中的元素直至祖级
    parentCheck: [], // 选中的父节点
    load: false, // 状态更新完成
    showCheckbox: true, // 是否显示选择框
    currentItem: null, // 当前选中节点
    checkWay: 2 // 1 单选 2多选
  },
  getters: {},
  mutations: {
    dataUpdate (state, array) {
      state.data = array
    },
    treelistUpdate (state, array) {
      state.treelist = array
    },
    currentDimensionUpdate (state, index) {
      state.currentDimension = index
    },
    halfCheckUpdate (state, array) {
      state.halfCheck = array
    },
    allCheckUpdate (state, array) {
      state.allCheck = array
    },
    treeCheckUpdate (state, array) {
      state.treeCheck = array
    },
    childCheckUpdate (state, array) {
      state.childCheck = array
    },
    parentCheckUpdate (state, array) {
      state.parentCheck = array
    },
    loadUpdate (state, sta) {
      state.load = sta
    },
    showCheckboxSet (state, sta) {
      state.showCheckbox = sta
    },
    currentItemUpdate (state, item) {
      state.currentItem = item
    },
    checkWayUpdate (state, val) {
      state.checkWay = val
    }
  },
  actions: {
    dataUpdate ({ commit }, array) {
      commit('dataUpdate', array)
    },
    treelistUpdate ({ commit }, array) {
      commit('treelistUpdate', array)
    },
    treelistInitialization ({ commit, state, dispatch }, array) {
      const treelist = state.treelist
      const each = (list) => {
        list.forEach(item => {
          item.check = 2
          if (('children' in item) && item.children.length) {
            each(item.children)
          }
        })
      }
      each(treelist)
      commit('countUpdate')
      commit('treelistUpdate', treelist)
    },
    currentDimensionUpdate ({ commit }, index) {
      commit('currentDimensionUpdate', index)
    },
    halfCheckUpdate ({ commit }, array) {
      commit('halfCheckUpdate', array)
    },
    allCheckUpdate ({ commit }, array) {
      commit('allCheckUpdate', array)
    },
    treeCheckUpdate ({ commit }, array) {
      commit('treeCheckUpdate', array)
    },
    childCheckUpdate ({ commit }, array) {
      commit('childCheckUpdate', array)
    },
    parentCheckUpdate ({ commit }, array) {
      commit('parentCheckUpdate', array)
    },
    nodeClick ({ commit }, item) {
    },
    defaultCheckUpdate ({ commit, state }, array) {
      const treelist = state.treelist
      const check = (list, id) => {
        list.some(someItem => {
          if (someItem.id === id) {
            someItem.check = 1
          }
          return someItem.id === id
        })
      }
      array.forEach(item => {
        check(treelist)
      })
    },
    findCheck ({ commit, state, dispatch }, list) {
      list.forEach(item => {
        if (('check' in item) && item.check === 1) {
          commit('allCheckUpdate', [...state.allCheck, item.id])
        }
        if (('check' in item) && item.check === 2) {
          commit('halfCheckUpdate', [...state.halfCheck, item.id])
        }
        if (('check' in item) && item.check === 1 && !(('children' in item) && item.children.length)) {
          commit('childCheckUpdate', [...state.childCheck, item.grandId])
          commit('treeCheckUpdate', [...state.treeCheck, item.id])
        } else if (('check' in item) && item.check !== 0 && (('children' in item) && item.children.length)) {
          commit('parentCheckUpdate', [...state.parentCheck, item.id])
        }
        if (('children' in item) && item.children.length && ('check' in item) && (item.check === 1 || item.check === 2)) {
          dispatch('findCheck', item.children)
        }
      })
    },
    loadUpdate ({ commit }, sta) {
      commit('loadUpdate', sta)
    },
    showCheckboxSet ({ commit }, sta) {
      commit('showCheckboxSet', sta)
    },
    currentItemUpdate ({ commit }, item) {
      commit('currentItemUpdate', item)
    },
    checkWayUpdate ({ commit }, val) {
      commit('checkWayUpdate', val)
    }
  }
}
