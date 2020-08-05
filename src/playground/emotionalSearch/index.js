const { analyze } = require('./../../services/watson')
const { search } = require('./../../services/google')
const { orderEmotionsDesc, objectToList, formatList, getAvarage, watsonFeatures } = require('./utils')

const fetchEmotionalResults = async ({ query, total = 3 }) => {
  const {
    data: { items }
  } = await search({ query, total })
  const content = items.map(({ link, title }) => ({ link, title }))
  const analysis = content.map(
    async ({ link }) =>
      await analyze({
        ...{ url: link },
        ...{ features: watsonFeatures }
      })
  )
  const results = await Promise.all(analysis)
  const list = results.map(({ result }, index) => ({
    title: content[index].title,
    url: content[index].link,
    emotions: result.emotion.document.emotion
  }))
  const emotionList = list.map(({emotions}) => emotions)
  const newList = objectToList(getAvarage(emotionList))
  const orderedList = orderEmotionsDesc(newList)
  const formattedList = formatList(orderedList)

  return {
    avarage: formattedList,
    details: list
  }
}

module.exports = { fetchEmotionalResults }
