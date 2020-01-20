const parentIds = ({ data, id }) => {
  let child = []
  find(data, id, child)
  return child.reverse()
}

const find = (data, val, child) => {
  const item = data.filter(item => item.id === val)
  child.push(...item)
  if (item.length && (item[0].parentId != '0')) {
    find(data, item[0].parentId, child)
  }
}
export default parentIds
