export default [
  
  {
    path: '/System',
    name: 'System',
    component: () => import('@/views/System'),
    children: [
      {
        path: 'User',
        name: '用户管理',
        component: () => import('@/views/System/User')
      },
      {
        path: 'Role',
        name: '角色管理',
        component: () => import('@/views/System/Role')
      },
      {
        path: 'Menu',
        name: '菜单管理',
        component: () => import('@/views/System/Menu')
      },
      {
        path: 'Department',
        name: '部门管理',
        component: () => import('@/views/System/Department')
      },
      {
        path: 'PositionManage',
        name: '岗位管理',
        component: () => import('@/views/System/Post')
      },
      {
        path: 'VehicleManage',
        name: '车辆管理',
        component: () => import('@/views/System/VehicleManage')
      },
      {
        path: 'PlaceManage',
        name: '位置管理',
        component: () => import('@/views/System/PlaceManage')
      },
      {
        path: 'DeviceManage',
        name: '设备管理',
        component: () => import('@/views/System/DeviceManage')
      },
      {
        path: 'TransportDeviceManage',
        name: '传输装置管理',
        component: () => import('@/views/System/TransportDeviceManage')
      },
      {
        path: 'MonitorCameraManage',
        name: '监控探头管理',
        component: () => import('@/views/System/MonitorCameraManage')
      },
      {
        path: 'DictionaryManage',
        name: '字典管理',
        component: () => import('@/views/System/DictionaryManage')
      },
      {
        path: 'Scheduler',
        redirect: 'Scheduler/Task',
        name: '调度任务管理',
        component: () => import('@/views/System/Scheduler'),
        children: [
          {
            path: 'Task',
            name: '定时任务',
            component: () => import('@/views/System/Scheduler/Task'),
          },
          {
            path: 'Log',
            name: '调度日志',
            component: () => import('@/views/System/Scheduler/Log'),
          }
        ]
      }
    ]
  },
  
  {
    path: '/Laboratory',
    name: 'Laboratory',
    component: () => import('@/views/Laboratory'),
    children: [
      {
        path: 'LaboratoryManage',
        name: '实验室管理',
        component: () =>
          import('@/views/Laboratory/LaboratoryManage'),
        children: [
          {
            path: 'LaboratoryInfoManage',
            name: '实验室信息管理',
            component: () => import('@/views/Laboratory/LaboratoryManage/LaboratoryInfoManage')
          },
          {
            path: 'LaboratoryConfigManage',
            name: '实验室配置管理',
            component: () => import('@/views/Laboratory/LaboratoryManage/LaboratoryConfigManage')
          }
        ]
      },
      {
        path: 'Examinations',
        name: '实验室考试',
        component: () => import('@/views/Laboratory/Examinations'),
        children: [
          {
            path: 'Learn',
            name: '安全学习',
            component: () => import('@/views/Laboratory/Examinations/Learn')
          },
          {
            path: 'SafetyExamination',
            name: '安全考试',
            component: () => import('@/views/Laboratory/Examinations/SafetyExamination')
          },
          {
            path: 'Exam',
            name: '安全考试',
            component: () => import('@/views/Laboratory/Examinations/Exam')
          },
          {
            path: 'Reserve',
            name: '考试预约',
            component: () => import('@/views/Laboratory/Examinations/Reserve')
          },
          {
            path: 'Question',
            name: '题库管理',
            component: () => import('@/views/Laboratory/Examinations/Question')
          },
          {
            path: 'Release',
            name: '考试发布',
            component: () => import('@/views/Laboratory/Examinations/Release')
          },
          {
            path: 'ExamReserveRecord',
            name: '考试预约记录',
            component: () => import('@/views/Laboratory/Examinations/ExamReserveRecord')
          }
        ]
      },
      {
        path: 'LaboratoryReserve',
        name: '实验室预约',
        component: () => import('@/views/Laboratory/LaboratoryReserve'),
        children: [
          {
            path: 'LaboratoryReserveManage',
            name: '预约管理',
            component: () => import('@/views/Laboratory/LaboratoryReserve/LaboratoryReserveManage')
          },
          {
            path: 'LaboratoryReserveRecord',
            name: '实验室预约记录',
            component: () => import('@/views/Laboratory/LaboratoryReserve/LaboratoryReserveRecord')
          },
          {
            path: 'LaboratoryReserveApproval',
            name: '预约审批',
            component: () => import('@/views/Laboratory/LaboratoryReserve/LaboratoryReserveApproval')
          }
        ]
      },
      {
        path: 'LaboratorySecurity',
        name: '实验室安全',
        component: () => import('@/views/Laboratory/LaboratorySecurity'),
        children: [
          {
            path: 'LaboratoryMonitor',
            name: '实时监测',
            component: () => import('@/views/Laboratory/LaboratorySecurity/LaboratoryMonitor')
          },
          {
            path: 'LaboratoryVideoSurveillance',
            name: '视频监控',
            component: () => import('@/views/Laboratory/LaboratorySecurity/LaboratoryVideoSurveillance')
          },
          {
            path: 'LaboratoryAccessManage',
            name: '出入管理',
            component: () => import('@/views/Laboratory/LaboratorySecurity/LaboratoryAccessManage')
          },
          
          
          
          
          
          {
            path: 'LaboratoryEmergencyManage',
            name: '应急管理',
            component: () => import('@/views/Laboratory/LaboratorySecurity/LaboratoryEmergencyManage')
          }
        ]
      }
    ]
  },
  
  {
    path: '/MeetingRoom',
    name: '会议室',
    component: () => import('@/views/MeetingRoom'),
    children: [
      {
        path: 'MeetingRoomManage',
        name: '会议室管理',
        component: () =>
          import('@/views/MeetingRoom/MeetingRoomManage'),
        children: [
          {
            path: 'MeetingRoomConfigManage',
            name: '会议室配置管理',
            component: () => import('@/views/MeetingRoom/MeetingRoomManage/MeetingRoomConfigManage')
          },
          {
            path: 'MeetingRoomInfoManage',
            name: '会议室信息管理',
            component: () => import('@/views/MeetingRoom/MeetingRoomManage/MeetingRoomInfoManage')
          }
        ]
      },
      {
        path: 'MeetingRoomReserve',
        name: '会议室预约',
        component: () => import('@/views/MeetingRoom/MeetingRoomReserve'),
        children: [
          {
            path: 'MeetingRoomReserveManage',
            name: '预约陈列室预约管理管理',
            component: () => import('@/views/MeetingRoom/MeetingRoomReserve/MeetingRoomReserveManage')
          },
          {
            path: 'MeetingRoomReserveRecord',
            name: '会议室预约记录',
            component: () => import('@/views/MeetingRoom/MeetingRoomReserve/MeetingRoomReserveRecord')
          },
          {
            path: 'MeetingRoomReserveApproval',
            name: '预约审批',
            component: () => import('@/views/MeetingRoom/MeetingRoomReserve/MeetingRoomReserveApproval')
          }
        ]
      },
      {
        path: 'MeetingRoomSecurity',
        name: '会议室安全',
        component: () => import('@/views/MeetingRoom/MeetingRoomSecurity'),
        children: [
          
          
          
          
          
          {
            path: 'MeetingRoomAccessManage',
            name: '出入管理',
            component: () => import('@/views/MeetingRoom/MeetingRoomSecurity/MeetingRoomAccessManage')
          }
        ]
      }
    ]
  },
  
  {
    path: '/Showroom',
    name: 'Showroom',
    component: () => import('@/views/Showroom'),
    children: [
      {
        path: 'ShowroomManage',
        name: '陈列室管理',
        component: () =>
          import('@/views/Showroom/ShowroomManage'),
        children: [
          {
            path: 'ShowRoomInfoManage',
            name: '陈列室信息管理',
            component: () => import('@/views/Showroom/ShowroomManage/ShowRoomInfoManage')
          },
          {
            path: 'ShowRoomConfigManage',
            name: '陈列室配置管理',
            component: () => import('@/views/Showroom/ShowroomManage/ShowRoomConfigManage')
          }
        ]
      },
      {
        path: 'ShowroomReserve',
        name: '陈列室预约',
        component: () => import('@/views/Showroom/ShowroomReserve'),
        children: [
          {
            path: 'ShowroomReserveManage',
            name: '预约管理',
            component: () => import('@/views/Showroom/ShowroomReserve/ShowroomReserveManage')
          },
          {
            path: 'ShowroomReserveRecord',
            name: '预约记录',
            component: () => import('@/views/Showroom/ShowroomReserve/ShowroomReserveRecord')
          },
          {
            path: 'ShowroomReserveApproval',
            name: '预约审批',
            component: () => import('@/views/Showroom/ShowroomReserve/ShowroomReserveApproval')
          }
        ]
      },
      {
        path: 'ShowroomSecurity',
        name: '陈列室安全',
        component: () => import('@/views/Showroom/ShowroomSecurity'),
        children: [
          
          
          
          
          
          {
            path: 'ShowroomAccessManage',
            name: '出入管理',
            component: () => import('@/views/Showroom/ShowroomSecurity/ShowroomAccessManage')
          }
        ]
      }
    ]
  },
  
  {
    path: '/FireControl',
    name: 'FireControl',
    component: () => import('@/views/FireControl'),
    children: [
      {
        path: 'GasDetection',
        name: '气体检测系统',
        component: () => import('@/views/FireControl/GasDetection')
      },
      {
        path: 'LaneOccupancy',
        name: '车道占用系统',
        component: () => import('@/views/FireControl/LaneOccupancy')
      },
      {
        path: 'ElectricalFire',
        name: '电气火灾系统',
        component: () => import('@/views/FireControl/ElectricalFire')
      },
      {
        path: 'FireWaterSupply',
        name: '消防给水系统',
        component: () => import('@/views/FireControl/FireWaterSupply')
      },
      {
        path: 'AutomaticFireAlarm',
        name: '火灾自动报警系统',
        component: () => import('@/views/FireControl/AutomaticFireAlarm')
      }
    ]
  },
  
  {
    path: '/Security',
    name: 'Security',
    component: () => import('@/views/Security'),
    children: [
      {
        path: 'VideoSurveillance',
        name: '视频监控',
        component: () => import('@/views/Security/VideoSurveillance')
      },
      {
        path: 'VideoCruise',
        name: '视频巡航',
        component: () => import('@/views/Security/VideoCruise')
      },
      {
        path: 'BorderPrevention',
        name: '边界防范',
        component: () => import('@/views/Security/BorderPrevention')
      },
      {
        path: 'AccessManagement',
        name: '出入管理',
        component: () => import('@/views/Security/AccessManagement')
      },
      {
        path: 'CentralControlRoom',
        name: '中控室',
        component: () => import('@/views/Security/CentralControlRoom')
      }
    ]
  },
  
  {
    path: '/Inspection',
    name: 'Inspection',
    component: () => import('@/views/Inspection'),
    children: [
      {
        path: 'InspectItem',
        name: '巡检项管理',
        component: () => import('@/views/Inspection/InspectItem')
      },
      {
        path: 'InspectRecord',
        name: '巡检项记录',
        component: () => import('@/views/Inspection/InspectRecord')
      },
      {
        path: 'InspectPlan',
        name: '巡检计划管理',
        component: () => import('@/views/Inspection/InspectPlan')
      },
      {
        path: 'InspectObject',
        name: '巡检对象管理',
        component: () => import('@/views/Inspection/InspectObject')
      },
      {
        path: 'InspectLine',
        name: '巡检线路管理',
        component: () => import('@/views/Inspection/InspectLine')
      }
    ]
  },
  
  {
    path: '/Events',
    name: 'Events',
    component: () => import('@/views/Events'),
    children: [
      {
        path: 'EventHandle',
        name: '事件处置',
        component: () => import('@/views/Events/EventHandle')
      },
      {
        path: 'MaintainceInfo',
        name: '维修',
        component: () => import('@/views/Events/MaintainceInfo')
      },
      {
        path: 'EventInfo',
        name: '追溯',
        component: () => import('@/views/Events/EventInfo')
      }
    ]
  },
  
  {
    path: '/Visit',
    name: 'Visit',
    component: () => import('@/views/Visit'),
    children: [
      {
        path: 'VisitManage',
        name: '拜访管理',
        component: () => import('@/views/Visit/VisitManage')
      },
      {
        path: 'visitRecord',
        name: '拜访管理',
        component: () => import('@/views/Visit/visitRecord')
      }
    ]
  },
  
  {
    path: '/Notice',
    name: 'Notice',
    component: () => import('@/views/Notice')
  }
]
