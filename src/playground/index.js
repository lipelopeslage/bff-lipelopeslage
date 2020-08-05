const { fetchEmotionalResults } = require('./emotionalSearch')

const playground = (app) => {
  app.get('/playground', (req, res) => {
    res.end('Playground')
  })

  app.get('/playground/emotional-search', async (req, res) => {
    res.json(await fetchEmotionalResults(req.body))
  })
}

module.exports = playground
