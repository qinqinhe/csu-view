let fitter = []
const tree = ({ arr, ids, name }) => {
  fitter = []
  arr = arr.map(item => {
    item.label = item[name]
    item.id = item[ids]
    item.value = item[ids]
    return item
  })
  const levelOne = arr.filter(item => item.parentId === '0')
  
  const levelOneOther = arr.filter(item => item.parentId !== '0')
  
  recursion({ arrNew: levelOne, arrRemainder: levelOneOther, ids, name })
  
  
  
  return {
    assemble: levelOne,
    fitter: fitter
  }
}

const recursion = ({ arrNew, arrRemainder, ids, name }) => {
  for (let i = 0; i < arrNew.length; i++) {
    const item = arrNew[i]
    const child = arrRemainder.filter(items => {
      return items.parentId === item[ids]
    })
    if (child.length) {
      item.children = child
      arrRemainder = arrRemainder.filter(item => item.parentId !== item[ids])
      recursion({ arrNew: item.children, arrRemainder, ids, name })
    } else {
      
      fitter.push(item)
    }
  }
}

export default tree
