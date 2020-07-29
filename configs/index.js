'use strict'
require('dotenv').config();

const config = {
  port: process.env.PORT,
  dev: process.env.MODE !== 'production',
  speechApiKey: process.env.SPEECH_API_KEY,
  speechUrl: process.env.SPEECH_URL,
  mongoDb: process.env.MONGO_DB,
  mongoUser: process.env.MONGO_USR,
  mongoPass: process.env.MONGO_PASS,
  mongoHost: process.env.MONGO_HOST,
};

module.exports = config;
