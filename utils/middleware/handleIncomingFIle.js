'use strict'
const multer = require('multer');
const Boom = require('@hapi/boom');

// Set the multimedia and verify the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') {
      cb(null, `${__dirname}/../../uploads`);
    } else {
      cb(Boom.badRequest('File type not compatible, you must upload .mp3/.wav files'), null);
    }
  },
  filename: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg')
      cb(null, `${file.fieldname}_${Date.now()}.mp3`);
    else if(file.mimetype === 'audio/wav')
      cb(null, `${file.fieldname}_${Date.now()}.wav`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
