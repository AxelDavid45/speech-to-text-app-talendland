const mongoose = require('mongoose');

const Transcript = new mongoose.Schema({
  status: Number,
  id: String,
  message: String,
  transcript: String,
})

module.exports = {
  schema: Transcript,
  TranscriptModel: mongoose.model('Transcript', Transcript)
};
