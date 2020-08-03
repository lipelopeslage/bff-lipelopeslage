const dotenv = require('dotenv')
const http = require('http')
const app = require('express')()
const port = process.env.PORT || 8080
dotenv.config()

app.get('/', (req, res) => {
  res.end('Hello World from Express!')
})

app.listen(port, () => {
  console.log(`Listening to port ${port}...`)
  console.log(process.env.ALGORITHMIA_CLIENT_KEY)
})
