const loginVendor = require('./loginVendor');
const registerVendor = require('./registerVendor');
const getVendorProfile = require('./vendorProfile');
const verifyVendorOtp = require('./verifyVendorOtp');

module.exports = {
  registerVendor,
  verifyVendorOtp,
  loginVendor,
  getVendorProfile,
};
