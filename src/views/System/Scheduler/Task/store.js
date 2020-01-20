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
        // 模态框表单数据
        modalForm: {
            // 任务名称
            jobName: "",
            // 任务组名
            jobGroup: "",
            // 方法名称
            methodName: "",
            // 方法参数
            methodParams: "",
            // CRON表达式
            cronExpression: "",
            // 计划执行错误策略（1立即执行 2执行一次 3放弃执行）
            misfirePolicy: '1',
            // 是否并发执行（0允许 1禁止）
            concurrent: '0',
            // 状态
            status: '0',
            // 备注
            remark: ""
        },
        // 模态框表单验证规则
        modalFormRules: {
            // 任务名称
            jobName: [
                { required: true, trigger: 'blur', message: '任务名称不能为空' }
            ],
            // 任务组名
            jobGroup: [
                { required: true, trigger: 'blur', message: '任务组名不能为空' }
            ],
            // 方法名称
            methodName: [
                { required: true, trigger: 'blur', message: '方法名称不能为空' }
            ],
            // 方法参数
            methodParams: [],
            // CRON表达式
            cronExpression: [
                { required: true, trigger: 'blur', message: 'CRON表达式不能为空' }
            ],
            // 计划执行错误策略（1立即执行 2执行一次 3放弃执行）
            misfirePolicy: [
                { required: true, trigger: 'blur', message: '请选择执行策略' }
            ],
            // 是否并发执行（0允许 1禁止）
            concurrent: [
                { required: true, trigger: 'blur', message: '请选择是否并发执行' }
            ],
            // 状态
            status: [
                { required: true, trigger: 'blur' }
            ],
            // 备注
            remark: []
        },
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
        },
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
            Object.keys(state.modalForm).forEach(key => {
                let value = ""
                if (data.hasOwnProperty(key)) {
                    value = data[key]
                } else if (key === 'misfirePolicy' || key === 'status') {
                    value = '1'
                } else if (key === 'concurrent') {
                    value = '0'
                }
                state.modalForm[key] = value
            })
        },
        changeSelection(state, jobList) {
            state.selection = jobList
        }
    },
    actions: {
        saveForm({ state, commit, dispatch }, form) {
            form.validate(async (valid) => {
                if (valid) {
                    let url = ""
                    let data = { ...state.modalForm }
                    if (state.modalType === 'addModal') {
                        url = '/scheduler/api/job/addJob'
                        delete data.status
                    } else if (state.modalType === 'editModal') {
                        url = '/scheduler/api/job/updateJob'
                        data['jobId'] = state.modalData.jobId
                    }
                    const { resultCode, resultMessage } = await webapi({ url, data })
                    if (resultCode === code.CODE_SUCCESS) {
                        dispatch('queryJobList').then(() => {
                            Message.success(resultMessage)
                            commit('toggleModal')
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm({ state, commit }) {
            commit('toggleModal', {
                type: state.modalType,
                data: state.modalData
            })
        },
        async queryJobList({ state }) {
            const url = '/scheduler/api/job/querySysJobByPage'
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
        runJob({ state }, jobId) {
            MessageBox.confirm('确认要立即执行一次任务吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const url = '/scheduler/api/job/runJob'
                const { resultCode } = await webapi({ url, data: { jobId } })
                if (resultCode === code.CODE_SUCCESS) {
                    Message.success('执行成功！')
                } else {
                    Message.success('执行失败！')
                }
            })
        },
        changeStatus({ state, dispatch }, { jobId, status }) {
            return new Promise(async (resolve, reject) => {
                MessageBox.confirm(`确认要${status === '1' ? '启用' : '停用'}任务吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const url = '/scheduler/api/job/changeStatus'
                    const { resultCode } = await webapi({ url, data: { jobId, status } })
                    await dispatch('queryJobList')
                    if (resultCode === code.CODE_SUCCESS) {
                        resolve()
                    } else {
                        reject(error)
                    }
                }).catch(error => {

                })
            })
        },
        deleteSectionJob({ state, dispatch }) {
            MessageBox.confirm('确认要删除这一组任务吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const url = '/scheduler/api/job/deleteJob'
                const jobIds = state.selection.map(item => item.jobId).join(',')
                const { resultCode } = await webapi({ url, data: { jobIds } })
                if (resultCode === code.CODE_SUCCESS) {
                    dispatch('queryJobList').then(() => {
                        Message.success('执行成功！')
                    })
                } else {
                    Message.success('执行失败！')
                }
            })
        },
        resetSearchForm({ state, dispatch }) {
            state.searchForm = {
                // 任务名称
                jobName: "",
                // 方法名称
                methodName: "",
                // 状态
                status: '',
            }
            dispatch('queryJobList')
        },
        pageCurrentChange({ state, dispatch }, page) {
            state.pageCurrent = page
            dispatch('queryJobList')
        }
    }
}