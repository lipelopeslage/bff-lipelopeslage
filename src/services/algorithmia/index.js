const Algorithmia = require('algorithmia')

const fetchAlgo = async (body) => {
  const { script, input } = body
  const { result } = await Algorithmia.client(process.env.ALGORITHMIA_CLIENT_KEY)
    .algo(script)
    .pipe(input)
  return result
}
module.exports = fetchAlgo
