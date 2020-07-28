const SpeechTextLib = require('../libs/speechToText');
class AudioService {
  constructor (file) {
    this.file = file;
  }

  async convertToSpeech() {
    const speech = new SpeechTextLib();
    const job = await speech.createJob(this.file.path, 'audio/mpeg');
    if (job.results.id && job.results.id ==='processing') {
      return {
        status: job.status,
        id: job.results.id,
        message: 'processing'
      }
    }
    console.log(job);
  }
}

module.exports = AudioService;
