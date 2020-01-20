import Vue from 'vue'
import vuex from 'vuex'
import tree from '@/components/Tree/store'
import manage from './modules/showroom/manage'
import dictionary from './modules/dictionary'
import systemDeviceManage from '@/views/System/DeviceManage/store'
import role from '@/views/System/Role/store'
import user from '@/views/System/User/store'
import dictionaryManage from '@/views/System/DictionaryManage/store'
import visitMange from '@/views/Visit/VisitManage/store'
import visitRecord from '@/views/Visit/visitRecord/store'
import showRoomConfigManage from '@/views/ShowRoom/ShowroomManage/ShowRoomConfigManage/store'
import showroomReserveManage from '@/views/Showroom/ShowroomReserve/ShowroomReserveManage/store'
import showroomReserveRecord from '@/views/Showroom/ShowroomReserve/ShowroomReserveRecord/store'
import showroomReserveApproval from '@/views/Showroom/ShowroomReserve/ShowroomReserveApproval/store'
import meetingRoomConfigManage from '@/views/MeetingRoom/MeetingRoomManage/meetingRoomConfigManage/store'
import meetingRoomReserveManage from '@/views/MeetingRoom/MeetingRoomReserve/MeetingRoomReserveManage/store'
import meetingRoomReserveApproval from '@/views/MeetingRoom/MeetingRoomReserve/MeetingRoomReserveApproval/store'
import meetingRoomReserveRecord from '@/views/MeetingRoom/MeetingRoomReserve/meetingRoomReserveRecord/store'
import laboratoryConfigManage from '@/views/Laboratory/LaboratoryManage/LaboratoryConfigManage/store'
import laboratoryLearn from '@/views/Laboratory/Examinations/Learn/store'
import laboratorySafetyExamination from '@/views/Laboratory/Examinations/SafetyExamination/store'
import laboratoryReserveManage from '@/views/Laboratory/LaboratoryReserve/LaboratoryReserveManage/store'
import laboratoryReserveRecord from '@/views/Laboratory/LaboratoryReserve/LaboratoryReserveRecord/store'
import laboratoryReserveApproval from '@/views/Laboratory/LaboratoryReserve/LaboratoryReserveApproval/store'
import laboratoryEmergencyManage from '@/views/Laboratory/LaboratorySecurity/LaboratoryEmergencyManage/store'
import inspectItem from '@/views/Inspection/InspectItem/store'
import inspectRecord from '@/views/Inspection/InspectRecord/store'
import inspectPlan from '@/views/Inspection/InspectPlan/store'
import inspectObject from '@/views/Inspection/InspectObject/store'
import inspectLine from '@/views/Inspection/InspectLine/store'
import eventInfo from '@/views/Events/EventInfo/store'
import maintainceInfo from '@/views/Events/MaintainceInfo/store'
import eventHandle from '@/views/Events/EventHandle/store'
import examinationsRelease from '@/views/Laboratory/Examinations/Release/store'
import scheduler from '@/views/System/Scheduler/Task/store'
import schedulerLog from '@/views/System/Scheduler/Log/store'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    tree,
    user,
    manage,
    dictionary,
    systemDeviceManage,
    role,
    dictionaryManage,
    visitMange,
    visitRecord,
    showRoomConfigManage,
    showroomReserveManage,
    showroomReserveRecord,
    showroomReserveApproval,
    meetingRoomConfigManage,
    meetingRoomReserveApproval,
    meetingRoomReserveManage,
    meetingRoomReserveRecord,
    laboratoryConfigManage,
    laboratoryLearn,
    laboratorySafetyExamination,
    laboratoryReserveManage,
    laboratoryReserveRecord,
    laboratoryReserveApproval,
    laboratoryEmergencyManage,
    inspectItem,
    inspectRecord,
    inspectPlan,
    inspectObject,
    inspectLine,
    eventInfo,
    maintainceInfo,
    eventHandle,
    examinationsRelease,
    scheduler,
    schedulerLog
  },
  state: {
    AddVisible: false,
    EditVisible: false,
    detailVisible: false,
    tableCheck: [],
    editloading: true,
    tableLoading: true,
    loading: false,
    deviceType: [],
    system: [],
    subsystem: [],
    transport: [],
    monitorCameraType: [],
    monitorCameraScenes: [],
    examination: [],
    fireSystem: [],
    securitySystem: [],
    showRoom: [],
    
    permission: [],
    swiperItem: 0
  },
  getters: {},
  methods: {},
  mutations: {
    AddVisibleChange (state, val) {
      state.AddVisible = val
    },
    EditVisibleChange (state, val) {
      state.EditVisible = val
      state.editloading = val
    },
    detailVisibleChange (state, val) {
      state.detailVisible = val
    },
    tableCheckChange (state, val) {
      state.tableCheck = val
    },
    editloadingUpdate (state, sta) {
      state.editloading = sta
    },
    tableLoadingUpdate (state, sta) {
      state.tableLoading = sta
    },
    loadingChange (state, sta) {
      state.loading = sta
    },

    deviceTypeChange (state, arr) {
      state.deviceType = arr
    },
    systemChange (state, arr) {
      state.system = arr
    },
    subsystemChange (state, arr) {
      state.subsystem = arr
    },
    transportChange (state, arr) {
      state.transport = arr
    },
    monitorCameraTypeChange (state, arr) {
      state.monitorCameraType = arr
    },
    monitorCameraScenesChange (state, arr) {
      state.monitorCameraScenes = arr
    },
    examinationChange (state, arr) {
      state.examination = arr
    },
    fireSystemSet (state, arr) {
      state.fireSystem = arr
    },
    securitySystemSet (state, arr) {
      state.securitySystem = arr
    },
    permissionChange (state, arr) {
      state.permission = arr
    },
    showRoomUpdate (state, array) {
      state.showRoom = array
    },
    swiperChange (state, index) {
      state.swiperItem = index

    }
  },
  actions: {
    loadingChange ({ commit }, sta) {
      commit('loadingChange', sta)
    },
    swiperChange ({ commit },{index, listLen}) {
      if (index > -1 && index < listLen) {
        commit('swiperChange', index)
        
      }
    }
  }
})
