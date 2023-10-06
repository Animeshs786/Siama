const getAllocatedBookings = require('./getAllocatedBookings');
const loginVendor = require('./loginVendor');
const registerVendor = require('./registerVendor');
const updateBookingStatus = require('./updateBookingStatus');
const uploadBookingInvoice = require('./uploadBookingInvoice');
const getVendorProfile = require('./vendorProfile');
const verifyVendorOtp = require('./verifyVendorOtp');

module.exports = {
  registerVendor,
  verifyVendorOtp,
  loginVendor,
  getVendorProfile,

  getAllocatedBookings,
  updateBookingStatus,
  uploadBookingInvoice,
};
