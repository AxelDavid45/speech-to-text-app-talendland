'use strict';
const SpeechTextLib = require('../libs/speechToText');
const Boom = require('@hapi/boom');

class AudioService {
  constructor (file = '') {
    this.file = file;
  }

  async convertToSpeech () {
    const speech = new SpeechTextLib();
    const job = await speech.createJob(this.file.path, 'audio/mpeg');

    if (job.result.id && job.result.status === 'processing') {
      console.log(job);
      return {
        status: job.status,
        id: job.result.id,
        message: job.result.status
      };
    } else {
      return {
        status: job.status,
        message: job.statusText
      };
    }
  }

  async getSpeechTransformed (jobId) {
    if (!jobId) {
      return Boom.badRequest('Missing Id parameter');
    }
    const speech = new SpeechTextLib();
    const job = await speech.checkJob(jobId);

    if (job.status === 200 && job.result.status === 'completed') {
      const { results } = job.result;
      const transcript = await results[0].results.reduce((accum, current, index) => {
        return accum + current.alternatives[0].transcript;
      }, '');

      return {
        status: job.status,
        id: job.result.id,
        message: job.result.status,
        transcript: transcript,
      };
    }
    return {
      status: job.status,
      id: job.result.id,
      message: job.result.status,
      transcript: null,
    };
  }
}

module.exports = AudioService;
