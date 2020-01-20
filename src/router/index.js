import Vue from 'vue'
import Router from 'vue-router'
import Jurisdiction from './Jurisdiction'
import { local } from '@/config/wildcard'
import routeAll from './routeAll'

Vue.use(Router)
const router = new Router({
  
  routes: [
    {
      path: '/Login',
      name: '登录',
      redirect: '/Login/Login',
      component: () => import('@/views/Login'),
      children: [
        {
          path: 'Login',
          name: '登录',
          component: () => import('@/views/Login/Login')
        },
        {
          path: 'ChangePassword',
          name: '修改密码',
          component: () => import('@/views/Login/ChangePassword')
        },
        {
          path: 'ForgetPassword',
          name: '修改密码',
          component: () => import('@/views/Login/ForgetPassword')
        }
      ]
    },
    
    {
      path: '/PersonalCenter',
      name: '个人中心',
      redirect: '/PersonalCenter/PersonalInformation',
      component: () => import('@/views/PersonalCenter'),
      children: [
        {
          path: 'PersonalInformation',
          name: '个人资料',
          component: () => import('@/views/PersonalCenter/PersonalInformation')
        },
      ]
    },
    
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/Home')
    },    
    {
      path: '/Control',
      name: '中控室',
      component: () => import('@/views/Role/Control'),
    },
    {
      path: '/Main',
      name: 'Main',
      component: () => import('@/views/Mains'),
      children: [
        ...Jurisdiction
      ]
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})
/*
 * to:即将要进入的目标路由对象
 * from:即将要离开的路由对象
 * next下一步操作
 */






export default router
