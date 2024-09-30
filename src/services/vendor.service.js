const httpStatus = require('http-status');
const { Vendors } = require('../models');
const ApiError = require('../utils/ApiError');

const createVendor = async (body) => {
  const vendor = await Vendors.create(body);
  if (!vendor) {
    return new ApiError(httpStatus.NOT_FOUND, 'vendor not found');
  }
  return vendor;
};

module.exports = {
  createVendor,
};
