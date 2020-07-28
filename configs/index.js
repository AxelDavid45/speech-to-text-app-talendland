'use strict'
require('dotenv').config();

const config = {
  port: process.env.PORT,
  dev: process.env.MODE !== 'production',
  speechApiKey: process.env.SPEECH_API_KEY,
  speechUrl: process.env.SPEECH_URL
};

module.exports = config;
