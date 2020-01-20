import webapi from '@/api/http'
import { code } from '@/config/wildcard'
import { Message, MessageBox } from 'element-ui'

export default {
    namespaced: true,
    state: {
        // 模态框类型
        modalType: null,
        // 传入模态框的数据
        modalData: {},
        // 全部任务
        jobList: [],
        // 选项框选中的任务
        selection: [],
        // 搜索关键词
        searchForm: {
            // 任务名称
            jobName: "",
            // 方法名称
            methodName: "",
            // 状态
            status: '',
            // 开始时间
            searchStartTime: '',
            // 结束时间
            searchEndTime: ''
        },
        searchTimeRange: [],
        // 分页信息
        pagination: {
            pageCurrent: 1,
            pageRows: 10,
            total: 0,
        }
    },
    mutations: {
        toggleModal(state, context) {
            let type = null
            let data = {}
            if (context instanceof Object) {
                type = context.type || null
                data = context.data || {}
            }
            state.modalType = type
            state.modalData = data
        },
        changeSelection(state, jobList) {
            state.selection = jobList
        }
    },
    actions: {
        async queryJobList({ state }) {
            const url = '/scheduler/api/jobLog/queryJobLogByPage'
            const { pageCurrent, pageRows } = state.pagination
            const { resultCode, data } = await webapi({
                url,
                data: {
                    pageCurrent,
                    pageRows,
                    ...state.searchForm
                }
            })
            if (resultCode === code.CODE_SUCCESS) {
                state.jobList = data.rows
                state.pagination.total = data.rowSum
            }
        },
        resetSearchForm({ state, dispatch }) {
            state.searchForm = {
                // 任务名称
                jobName: "",
                // 方法名称
                methodName: "",
                // 状态
                status: '',
                // 开始时间
                searchStartTime: '',
                // 结束时间
                searchEndTime: ''
            }
            state.searchTimeRange = []
            dispatch('queryJobList')
        },
        pageCurrentChange({ state, dispatch }, page) {
            state.pageCurrent = page
            dispatch('queryJobList')
        },
        clearJobLog () {
            MessageBox.confirm('确认要清空全部日志吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const url = '/scheduler/api/jobLog/cleanJobLog'
                const { resultCode } = await webapi({ url })
                if (resultCode === code.CODE_SUCCESS) {
                    Message.success('执行成功！')
                } else {
                    Message.success('执行失败！')
                }
            })
        },
        deleteSectionJobLog({ state, dispatch }) {
            MessageBox.confirm('确认要删除这一组日志吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const url = '/scheduler/api/jobLog/deleteJobLog'
                const jobLogIds = state.selection.map(item => item.jobLogId).join(',')
                const { resultCode } = await webapi({ url, data: { jobLogIds } })
                if (resultCode === code.CODE_SUCCESS) {
                    dispatch('queryJobList').then(() => {
                        Message.success('执行成功！')
                    })
                } else {
                    Message.success('执行失败！')
                }
            })
        },
    }
}