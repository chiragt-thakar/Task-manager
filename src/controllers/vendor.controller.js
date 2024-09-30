const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { vendorService } = require('../services');

const createVendor = catchAsync(async (req, res) => {
  const vendorRes = await vendorService.createVendor(req.body);

  res.status(httpStatus.CREATED).send(vendorRes);
});
module.exports = {
  createVendor,
};
