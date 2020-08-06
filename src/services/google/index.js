const google = require('googleapis').google
const customSearch = google.customsearch('v1')

const search = async ({ query, total = 2 }) => {
  const response = await customSearch.cse.list({
    auth: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
    q: query,
    num: total,
    sort: 'date'
  })
  return response
}

module.exports = { search }
