const Joi = require('joi');

const crateCategory = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
  }),
};

module.exports = {
  crateCategory,
};
