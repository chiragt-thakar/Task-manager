const mongoose = require('mongoose');
const validator = require('validator');
const { VENDOR, CATEGORY } = require('../config/mongoTables');

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    address: {
      address: {
        type: String,
        trim: true,
      },
      pinCode: {
        type: String,
        match: /^[1-9][0-9]{5}$/,
      },
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: CATEGORY,
      },
    ],
  },

  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('vendors', vendorSchema, VENDOR);
