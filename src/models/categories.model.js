const mongoose = require('mongoose');
const { CATEGORY } = require('../config/mongoTables');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },

  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('categories', categorySchema, CATEGORY);
