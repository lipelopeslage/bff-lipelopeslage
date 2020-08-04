const { analyze } = require('../watson')
const { search } = require('../google')

const features = {
  emotion: {
    document: true
  }
}

const sortEmotions = (obj) => {
  const emotions = Object.keys(obj)
  const values = Object.values(obj)
  const list = emotions.map((item, index) => ({ type: emotions[index], value: values[index] }))
  const sorted = list.sort((a, b) => b.value - a.value)
  return sorted.reduce((acc, item) => {
    acc[item.type] = item.value //`${parseFloat(item.value * 100).toFixed(2)}%`
    return acc
  }, {})
}

const fetchData = async (query) => {
  const TOTAL_RESULTS = 5
  const {
    data: { items }
  } = await search({ ...query, total: TOTAL_RESULTS })
  //console.log(items)
  const content = items.map(({ link, title }) => ({ link, title }))
  const analysis = content.map(
    async ({ link }) =>
      await analyze({
        ...{ url: link },
        ...{ features }
      })
  )
  const results = await Promise.all(analysis)

  const list = results.map(({ result }, index) => ({
    title: content[index].title,
    url: content[index].link,
    emotions: sortEmotions(result.emotion.document.emotion)
  }))

  const avarageEmotions = list
    .map(({ emotions }) => emotions)
    .reduce((acc, item) => {
      const keys = Object.keys(item)
      keys.forEach((key) => {
        acc[key] = (acc[key] || 0) + item[key] / TOTAL_RESULTS
      })
      return acc
    }, {})

  const formattedAvarage = Object.keys(avarageEmotions).reduce((acc, item) => {
    acc[item] = `${parseFloat(avarageEmotions[item] * 100).toFixed(2)}%`
    return acc
  }, {})

  const details = {
    data: {
      ...query,
      avarageEmotions: formattedAvarage,
      analyzedResults: {
        total: TOTAL_RESULTS,
        details: list
      }
    }
  }

  return details
}

module.exports = { fetchData }
