'use strict';

const Joi = require('joi');

module.exports = {
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).default('')
};
