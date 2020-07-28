const express = require('express');
const router = express.Router();
const multer = require('multer');

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
      throw new Error('The mime-type is not compatible');
    }
    res.end('completed');
  } catch (err) {
    next(err);
  }

});

module.exports = router;
