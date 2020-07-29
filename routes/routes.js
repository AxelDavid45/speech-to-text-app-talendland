'use strict';
const express = require('express');
const upload = require('../utils/middleware/handleIncomingFIle');
const AudioService = require('../services/audioService');
const Boom = require('@hapi/boom');
const router = express.Router();

router.post('/upload', upload.single('speech'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return Boom.badRequest('File missing');
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
      return Boom.badRequest('Job id missing');
    }
    const audioService = new AudioService();
    const response = await audioService.getSpeechTransformed(jobId);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post('/translate/:id', express.json(), async (req, res) => {
  const id = req.params.id;
  const transcript = req.body.transcript;
  if (!id || !transcript) {
    return Boom.badRequest('Missing parameters');
  } else if (!id) {
    return Boom.badRequest('Missing id parameter');
  } else if (!transcript) {
    return Boom.badRequest('Missing transcript body parameters');
  }


  console.log(id, transcript);

});

module.exports = router;
