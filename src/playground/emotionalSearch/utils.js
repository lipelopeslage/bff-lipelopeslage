const orderEmotionsDesc = (list) => list.sort((a, b) => b.value - a.value)

const objectToList = (obj) => Object.entries(obj).map(([key, value]) => ({ id: key, value }))

const formatList = (list) =>
  list.reduce((acc, { id, value }) => {
    acc[id] = `${parseFloat(value * 100).toFixed(2)}%`
    return acc
  }, {})

const getAvarage = (lists) => {
  const total = lists.length
  return lists.reduce((acc, list) => {
    for (let key in list) {
      acc[key] = (acc[key] || 0) + list[key] / total
    }
    return acc
  }, {})
}

const watsonFeatures = {
  emotion: {
    document: true
  }
}

module.exports = { orderEmotionsDesc, objectToList, formatList, getAvarage, watsonFeatures }
