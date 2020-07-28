'use strict'
const Boom = require('@hapi/boom');
const config = require('../../configs/index');

const env = (err, stack) => {
  if (config.dev) {
    console.log(err, stack);
    return { ...err, stack };
  }
  return { ...err  };
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res,  next) => {
  const { output: { statusCode, payload } } = Boom.boomify(err);
  res.status(statusCode).json(env(payload, err.stack));
};

module.exports = errorHandler;
