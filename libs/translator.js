'use strict'
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const { translatorApiKey, translatorUrl } = require('../configs/index');
class Translator {
  authenticate() {
    return new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: translatorApiKey
      }),
      url: translatorUrl
    });
  }

  async translate(input, languageTarget) {
    const connection = this.authenticate();
    return await connection.translate({
      text: input,
      target: languageTarget
    })
  }

}
module.exports = Translator;
