const LanguageAnalyzer = require('../libs/languageAnalyzer');
const Boom = require('@hapi/boom');
class AnalyzerService {
  async analyze(text) {
    if (!text) {
      throw Boom.badRequest('Missing text in body');
    }
    // Create connection
    const connection = new LanguageAnalyzer();
    // Send request
    const response = await connection.analyze(text);
    if (response.status === 200) {
      return {
        'status': response.status,
        'language': response.result.language,
        'keywords': response.result.keywords,
        'entities': response.result.entities
      };
    } else {
      throw Boom.serverUnavailable('There was a problem with the analyzer service');
    }
  }
}

module.exports = AnalyzerService;
