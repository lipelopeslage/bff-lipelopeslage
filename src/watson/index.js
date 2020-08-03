const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_CLIENT_KEY
  }),
  version: '2020-08-03',
  url: process.env.WATSON_NLU_URL
})

nlu.analyze(
  {
    text: 'Are you still working? We have to clean the house and eat breakfest!',
    features: {
      emotion: {
        document: true
      }
    }
  },
  (error, response) => {
    if (error) {
      throw error
    }

    console.log(response.result.emotion)
  }
)
/*
REF: https://cloud.ibm.com/apidocs/natural-language-understanding?code=node
*/
