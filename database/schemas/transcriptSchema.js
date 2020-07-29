const mongoose = require('mongoose');

const Transcript = new mongoose.Schema({
  status: Number,
  id: String,
  message: String,
  transcript: String,
})

module.exports = {
  schema: Transcript,
  model: mongoose.model('Transcript', Transcript)
};
