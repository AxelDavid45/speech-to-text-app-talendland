const SpeechTextLib = require('../libs/speechToText');
class AudioService {
  constructor (file) {
    this.file = file;
  }

  async convertToSpeech() {
    const speech = new SpeechTextLib();
    const job = await speech.createJob(this.file.path, 'audio/mpeg');

    if (job.result.id && job.result.status ==='processing') {
      return {
        status: job.status,
        id: job.result.id,
        message: 'processing'
      };
    } else {
      return {
        status: job.status,
        message: job.statusText
      };
    }
  }
}

module.exports = AudioService;
