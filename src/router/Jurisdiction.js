import routeAll from './routeAll'
import { local } from '@/config/wildcard'

const Jurisdiction = () => {
  if (localStorage.getItem(local.ROUTE)) {
    const route = JSON.parse(localStorage.getItem(local.ROUTE))
    const routeRes = routeMap(route, routeAll)
    localStorage.setItem(local.ROUTEMATCH, JSON.stringify(routeRes))
    
    return routeRes
  } else {
    localStorage.setItem(local.ROUTEMATCH, JSON.stringify([]))
    return []
  }
}
/**
 * 路由权限匹配
 * @param {*} routeList 路由列表
 * @param {*} routeAll  所有路由
 */
const routeMap = (routeList, routeAll) => {
  let routeArr = []
  routeList.forEach((item, index) => {
    routeAll.forEach((items, indexs) => {
      if (item.menuRoute === items.path) {
        items.name = item.menuInfoId
        items.menuName = item.menuName
        if (item.children && item.children.length && items.children && items.children.length) {
          items.children = routeMap(item.children, items.children)          
          items.redirect = items.path + '/' + items.children[0].path
        }
        routeArr.unshift(items)
      }
    })
  })
  return routeArr

}
export default Jurisdiction()
