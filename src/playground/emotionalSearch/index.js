const { analyze } = require('./../../services/watson')
const { search } = require('./../../services/google')
const { orderEmotionsDesc, objectToList, formatList, getEmotionsAvarage, getSentimentAvarage, watsonFeatures } = require('./utils')

const fetchEmotionalResults = async ({ query, total = 8 }) => {
  const {
    data: { items }
  } = await search({ query, total })
  const content = items.map(({ link, title }) => ({ link, title }))
  const analysis = content.map(
    async ({ link }) =>
      await analyze({
        ...{ url: link },
        ...{ features: watsonFeatures, language: 'pt' }
      })
  )
  const results = await Promise.all(analysis)
  const formattedList = results.map(({ result }, index) => ({
    title: content[index].title,
    url: content[index].link,
    emotions: result?.emotion?.document?.emotion,
    sentiment: result?.sentiment?.document,
    warnings: result.warnings
  }))

  const emotionList = formattedList.map(({ emotions }) => emotions)
  const avarageEmotionList = objectToList(getEmotionsAvarage(emotionList))
  const orderedEmotionList = orderEmotionsDesc(avarageEmotionList)
  const formattedEmotionList = formatList(orderedEmotionList)

  const sentimentList = formattedList.map(({ sentiment }) => sentiment)
  const { score: avarageSentiment } = getSentimentAvarage(sentimentList)
  
  return {
    avarage: {
      emotions: formattedEmotionList,
      sentiment: {
        score: avarageSentiment,
        label: avarageSentiment > 0 ? 'positive' : 'negative'
      }
    },
    details: formattedList
  }
}

module.exports = { fetchEmotionalResults }
