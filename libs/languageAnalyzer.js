const NaturalLanguageUnderstandingV1  = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const {
  lanUnderstandingApiKey,
  lanUnderstandingUrl
} = require('../configs/index');

class LanguageAnalyzer {
  authenticate() {
    return new NaturalLanguageUnderstandingV1({
      version: '2019-07-12',
      authenticator: new IamAuthenticator({
        apikey: lanUnderstandingApiKey,
      }),
      url: lanUnderstandingUrl,
    })
  }

  async analyze(text) {
    const connection = this.authenticate();
    const analyzeParams = {
      'text': text,
      'features': {
        'entities': {
          'limit': 6
        },
        'keywords': {
          'limit': 6
        }
      }
    };
    const response = await connection.analyze(analyzeParams);
    console.log(response);
  }
}

module.exports = LanguageAnalyzer;
