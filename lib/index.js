'use strict';

const Joi = require('joi');

const Validator = require('./validator');

exports.register = (server, options, next) => {

  const validation = Joi.validate(options, Validator);

  if (validation.error) {
    return next(validation.error);
  }

  server.auth.strategy('tiny', 'basic', true, {
    validateFunc: (request, username, password, callback) => {
      const isValid = username === options.username &&
        (password === options.password || options.password === undefined);

      callback(null, isValid, {});
    }
  });

  next();

};

exports.register.attributes = {
  name: 'authentication'
};
