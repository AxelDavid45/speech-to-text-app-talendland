'use strict'
require('dotenv').config();

const config = {
  port: process.env.PORT,
  dev: process.env.MODE !== 'production',
};

module.exports = config;
