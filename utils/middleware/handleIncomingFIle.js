'use strict'
const multer = require('multer');
const Boom = require('@hapi/boom');

// Set the multimedia and verify the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype !== 'audio/mpeg' || file.mimetype !== 'audio/mp4') {
      cb(Boom.badRequest('File type not compatible, you must upload .mp3 files'), null);
    } else {
      cb(null, `${__dirname}/../../uploads`);
    }
  },
  filename: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg')
      cb(null, `${file.fieldname}_${Date.now()}.mp3`);
    else if(file.mimetype === 'audio/mp4')
      cb(null, `${file.fieldname}_${Date.now()}.mp4`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
