const dotenv = require('dotenv')
const app = require('express')()
const bodyParser = require('body-parser')
const Algorithmia = require('algorithmia')

const port = process.env.PORT || 8080

dotenv.config()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('Hello World from Express!')
})

app.get('/algo', async (req, res) => {
  const { script, targetURL, target } = req.body
  const { result } = await Algorithmia.client(process.env.ALGORITHMIA_CLIENT_KEY)
    .algo(`${script}?timeout=${process.env.ALGORITHMIA_CLIENT_TIMEOUT}`) // timeout is optional
    .pipe(targetURL || target)
  res.json({ result })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
})
