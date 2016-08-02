'use strict';

const Joi = require('joi');

const Validator = require('../lib/validator');

describe('validator', () => {

  describe('username', () => {

    it('is required', () => {
      const options = { password: 'password' };
      const result = Joi.validate(options, Validator);

      expect(result.error.details[0].path).to.eql('username');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is at least three characters long', () => {
      const options = {
        username: 'un',
        password: 'password'
      };
      const result = Joi.validate(options, Validator);

      expect(result.error.details[0].path).to.eql('username');
      expect(result.error.details[0].type).to.eql('string.min');
    });

  });

  describe('password', () => {

    it('is at least three characters long', () => {
      const options = {
        username: 'username',
        password: 'pw'
      };
      const result = Joi.validate(options, Validator);

      expect(result.error.details[0].path).to.eql('password');
      expect(result.error.details[0].type).to.eql('string.min');
    });

  });

});
