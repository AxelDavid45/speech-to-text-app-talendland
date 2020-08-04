'use strict';
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
  translatorApiKey: process.env.TRANSLATOR_API_KEY,
  translatorUrl: process.env.TRANSLATOR_URL,
  lanUnderstandingApiKey: process.env.LANUNDERSTAN_API_KEY,
  lanUnderstandingUrl:process.env.LANUNDERSTAN_URL,
  urlSite: 'https://ibm-challenge-backend.herokuapp.com/'
};

module.exports = config;
