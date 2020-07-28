'use strict'
const express = require('express');
const Boom = require('@hapi/boom');
const router = express.Router();
const multer = require('multer');

// Set the multimedia
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}.mp3`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('speech'), (req, res, next) => {
  try {
    const file = req.file;
    // Verify MIME-type
    if (file.mimetype !== 'audio/mpeg') {
      throw Boom.badRequest('File type not compatible, you must upload .mp3 files');
    }

    res.json({
      status: 'completed',
      data: {
        file: file.fieldname,
        transcript: 'transcript'
      }
    });
  } catch (err) {
    next(err);
  }

});

module.exports = router;
