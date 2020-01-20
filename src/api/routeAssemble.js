const routeAssemble = (arr) => {
  
  const levelOne = arr.filter(item => {
    
    
    
    return item.parentId === '0'
  })
  
  const levelOneOther = arr.filter(item => item.parentId !== '0')
  levelOne.forEach(item => {
    recursion(item, levelOneOther)
  })
  
  return levelOne
}

/*
 * 路由递归组装方法
 * item 需要添加子路由的路由
 * route 被匹配之后剩余的路由
 */
const recursion = (item, route) => {
  for (let i = route.length - 1; i >= 0; i--) {
    let items = route[i]
    if (item.menuInfoId === items.parentId) {
      if (!item.children) {
        item.children = []
      }
      item.children.push(items)
      route.splice(i, 1)
    }
    if (item.children && item.children.length && (i === 0)) {
      item.children.forEach(itema => {
        recursion(itema, route)
      })

    }
  }
}

export default routeAssemble
