const IbmSpeechToText = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const config = require('../configs');
const fs = require('fs');

class SpeechToText {
  authenticate () {
    return new IbmSpeechToText({
      authenticator: new IamAuthenticator({
        apikey: config.speechApiKey
      }),
      url: config.speechUrl
    });
  }

  async createJob (path, contentType) {
    const connection = this.authenticate();
    return await connection.createJob({
      audio: fs.createReadStream(path),
      contentType: contentType
    });
  }

  async checkJob (jobId) {
    const connection = this.authenticate();
    return await connection.checkJob(jobId);
  }
}

module.exports = SpeechToText;
