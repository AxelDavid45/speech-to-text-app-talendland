const IbmSpeechToText = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const config = require('../configs');

class SpeechToText {
  autenticate () {
    return new IbmSpeechToText({
      authenticator: new IamAuthenticator({
        apikey: config.speechApiKey
      }),
      url: config.speechUrl
    });
  }
}

module.exports = SpeechToText;
