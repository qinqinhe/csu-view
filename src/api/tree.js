const tree = ({ arr, ids, name }) => {
  arr = arr.map(item => {
    item.label = item[name]
    item.id = item[ids]
    item.value = item[ids]
    return item
  })
  const levelOne = arr.filter(item => {
    if (item.parentId === '0') item.grandId = item.id
    item.switch = 0
    return item.parentId === '0'
  })
  const levelOneOther = arr.filter(item => item.parentId !== '0')
  recursion({ arrNew: levelOne, arrRemainder: levelOneOther, ids, name })
  return levelOne
}

const recursion = ({ arrNew, arrRemainder, ids, name }) => {
  for (let i = 0; i < arrNew.length; i++) {
    const item = arrNew[i]
    const child = arrRemainder.filter(items => {
      if (items.parentId === item[ids]) items.grandId = item.grandId + ',' + items[ids]
      return items.parentId === item[ids]
    })
    if (child.length) {
      item.children = child
      arrRemainder = arrRemainder.filter(item => item.parentId !== item[ids])
      recursion({ arrNew: item.children, arrRemainder, ids, name })
    }

  }
}

export default tree

