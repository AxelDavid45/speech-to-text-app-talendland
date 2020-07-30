const Boom = require('@hapi/boom');
const Translator = require('../libs/translator');
const MongoDb = require('../libs/mongoose');
const { TranscriptModel } = require('../database/schemas/transcriptSchema');

class TranslationService {
  async connect () {
    return new MongoDb();
  }

  async translate (id, transcript, target) {
    // Verify if parameters exists
    if (!id && !transcript && target) {
      throw Boom.badRequest('Missing parameters');
    } else if (!id) {
      throw Boom.badRequest('Missing id parameter');
    } else if (!transcript) {
      throw Boom.badRequest('Missing transcript in body parameters');
    } else if (!target) {
      throw Boom.badRequest('Missing language target in body parameters');
    }

    // Connect to the translator service and translate
    const translator = new Translator();
    const translation = await translator.translate(transcript.trim(), target);
    if (translation.status === 200 && translation.result.word_count > 0) {
      // Save result in atlas
      await this.connect();
      const document = await TranscriptModel.findOneAndUpdate(
        { id: id.trim() },
        { $set: { translation: translation.result.translations[0].translation } },
        { new: true }
      );
      if (document) {
        return {
          status: translation.status,
          id: id.trim(),
          original: transcript,
          translation: translation.result.translations[0].translation,
          words: translation.result.word_count,
          saved: true
        };
      }
      return {
        status: translation.status,
        id: id.trim(),
        original: transcript,
        translation: translation.result.translations[0].translation,
        words: translation.result.word_count,
        saved: false
      };
    }
    // Save result in ibm object storage
    throw Boom.internal('Try later');
  }
}

module.exports = TranslationService;
