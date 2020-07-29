'use strict';
const express = require('express');
const upload = require('../utils/middleware/handleIncomingFIle');
const AudioService = require('../services/audioService');
const Boom = require('@hapi/boom');
const router = express.Router();
const TranslationService = require('../services/translationService');

router.post('/upload', upload.single('speech'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      throw Boom.badRequest('File missing');
    }
    const audioService = new AudioService(file);
    const response = await audioService.convertToSpeech();
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
    res.json(response);
  } catch (err) {
    next(err);
  }

});

module.exports = router;
