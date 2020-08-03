const dotenv = require('dotenv')
const app = require('express')()
const bodyParser = require('body-parser')
const fetchAlgo = require('./src/algorithmia')
require('./src/watson')

const port = process.env.PORT || 8080
dotenv.config()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('Hello World from Express!')
})

app.get('/algo', async (req, res) => {
  res.json(await fetchAlgo(req.body))
})

app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
