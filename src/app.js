const dotenv = require('dotenv')
const app = require('express')()
const bodyParser = require('body-parser')
const fetchAlgo = require('./services/algorithmia')
const { analyze } = require('./services/watson')
const { search } = require('./services/google')
//const { fetchData } = require('lipelopeslage')

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

app.get('/playground', async (req, res) => {
  res.json(await fetchData(req.body))
})

app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})

require('./playground/index')(app)