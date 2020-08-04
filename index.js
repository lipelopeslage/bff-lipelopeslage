const dotenv = require('dotenv')
const app = require('express')()
const bodyParser = require('body-parser')
const fetchAlgo = require('./src/algorithmia')
const { analyze } = require('./src/watson')
const { search } = require('./src/google')
const { fetchData } = require('./src/lipelopeslage')

const port = process.env.PORT || 8080
dotenv.config()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('Hello World from Express!')
})

app.get('/algo', async (req, res) => {
  res.json(await fetchAlgo(req.body))
})

app.get('/google', async (req, res) => {
  res.json(await search(req.body))
})

app.get('/watson', async (req, res) => {
  res.json(await analyze(req.body))
})

app.get('/watson', async (req, res) => {
  res.json(await analyze(req.body))
})

app.get('/search', async (req, res) => {
  res.json(await fetchData(req.body))
})

app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
