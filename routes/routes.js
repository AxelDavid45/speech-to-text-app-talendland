'use strict'
const express = require('express');
const upload = require('../utils/middleware/handleIncomingFIle');
const AudioService = require('../services/audioService');
const router = express.Router();


router.post('/upload', upload.single('speech'), async (req, res, next) => {
  try {
    const file = req.file;
    const audioService = new AudioService(file);
    const response = await audioService.convertToSpeech();
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
