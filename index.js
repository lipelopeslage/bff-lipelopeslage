const http = require('http')
const port = process.env.PORT || 8080
try {
  http
    .createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Hello World!')
    })
    .listen(port)
  console.log(`Listening to port ${port}...`)
} catch (e) {
  console.error(e)
}
