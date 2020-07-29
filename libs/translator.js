'use strict'
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const Boom = require('@hapi/boom');
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

  async translate(input, languageModelId = 'es-en') {
    if (!input) {
      return Boom.badImplementation('Missing input parameter');
    }
    const connection = this.authenticate();
    return await connection.translate({
      text: input,
      modelId: languageModelId
    })
  }

}
module.exports = Translator;
