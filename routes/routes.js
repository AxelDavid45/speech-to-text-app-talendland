'use strict';
const express = require('express');
const upload = require('../utils/middleware/handleIncomingFIle');
const Boom = require('@hapi/boom');
const router = express.Router();
const AudioService = require('../services/audioService');
const AnalyzerService = require('../services/analyzerService');
const TranslationService = require('../services/translationService');

router.post('/upload', upload.single('speech'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      throw Boom.badRequest('File missing');
    }
    const audioService = new AudioService(file);
    const response = await audioService.convertToSpeech();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get('/status/:jobId', async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      throw Boom.badRequest('Job id missing');
    }
    const audioService = new AudioService();
    const response = await audioService.getSpeechTransformed(jobId);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post('/translate/:id', express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const transcript = req.body.transcript;
    const target = req.body.target ? req.body.target : 'es';

    // Create the service
    const translationService = new TranslationService();
    const response = await translationService.translate(id, transcript, target);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.json(response);
  } catch (err) {
    next(err);
  }

});

router.post('/analyze', express.json(), async(req, res, next) => {
  try {

    const { text } = req.body;
    const analyzer = new AnalyzerService();
    const response = await analyzer.analyze(text);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.json(response);

  } catch(err) {
    next(err);
  }

})


module.exports = router;
