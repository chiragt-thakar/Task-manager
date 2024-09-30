const Joi = require('joi');
const { objectId } = require('./custom.validation');

const pinCodePattern = /^[1-9][0-9]{5}$/;

const crateVendor = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
    email: Joi.string().trim().required().email().messages({
      'string.empty': 'email cannot be empty',
      'any.required': 'email is required',
    }),
    address: Joi.object({
      address: Joi.string().trim().required().messages({
        'string.empty': 'Address cannot be empty',
        'any.required': 'Address is required',
      }),
      pinCode: Joi.string().pattern(pinCodePattern).required().messages({
        'string.pattern.base': 'Pin code must be a 6-digit number',
        'string.empty': 'Pin code cannot be empty',
        'any.required': 'Pin code is required',
      }),
    })
      .required()
      .messages({
        'any.required': 'Address is required',
      }),
    categories: Joi.array().items(Joi.string().custom(objectId)).min(1).required().messages({
      'array.min': 'At least one category is required',
      'any.required': 'Categories are required',
    }),
  }),
};

module.exports = {
  crateVendor,
};
