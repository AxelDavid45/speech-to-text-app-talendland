'use strict';
const SpeechTextLib = require('../libs/speechToText');
const MongoDb = require('../libs/mongoose');
const Boom = require('@hapi/boom');
const { TranscriptModel } = require('../database/schemas/transcriptSchema');

class AudioService {
  constructor (file = '') {
    this.file = file;
    this.mongo = new MongoDb();
  }

  async convertToSpeech (model = 'es-MX_BroadbandModel') {
    const speech = new SpeechTextLib();
    const job = await speech.createJob(this.file.path, 'audio/mpeg', model);

    if (job.result.id && job.result.status === 'processing') {
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
      const transcript = await results[0].results.reduce((accum, current) => {
        return accum + current.alternatives[0].transcript;
      }, '');

      const modelData = {
        status: job.status,
        id: job.result.id,
        message: job.result.status,
        transcript: transcript
      };

      // Save in the db
      const search = await TranscriptModel.find({ id: modelData.id }).countDocuments();
      if (search === 0) {
        const transcriptDocument = new TranscriptModel(modelData);
        await transcriptDocument.save();
      }
      return modelData;
    }

    return {
      status: job.status,
      id: job.result.id,
      message: job.result.status,
      transcript: null
    };
  }
}

module.exports = AudioService;
