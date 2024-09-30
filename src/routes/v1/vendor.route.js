
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const vendorValidation = require('../../validations/vendor.validation');
const { vendorController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('addVendors'), validate(vendorValidation.crateVendor), vendorController.createVendor)
  .get(auth('getAllVendors'));

module.exports = router;
