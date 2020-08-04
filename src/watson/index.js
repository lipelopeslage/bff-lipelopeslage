const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_CLIENT_KEY
  }),
  version: '2020-08-03',
  url: process.env.WATSON_NLU_URL
})

const analyze = (params) => {
  return new Promise((resolve, reject) => {
    nlu.analyze(
      {
        ...params,
      },
      (error, response) => {
        if (error) {
          reject(error)
        }
        resolve(response)
      }
    )
  })
}

module.exports = { analyze }
/*
REF: https://cloud.ibm.com/apidocs/natural-language-understanding?code=node
*/
