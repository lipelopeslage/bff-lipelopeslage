const Algorithmia = require('algorithmia')

const fetchAlgo = async (body) => {
  const { script, targetURL, target } = body
  const { result } = await Algorithmia.client(process.env.ALGORITHMIA_CLIENT_KEY)
    .algo(`${script}?timeout=${process.env.ALGORITHMIA_CLIENT_TIMEOUT}`) // timeout is optional
    .pipe(targetURL || target)
  return result
}
module.exports = fetchAlgo
