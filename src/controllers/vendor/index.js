const getVendorPhoneOtp = require('./auth/getVendorPhoneOtp');
const loginVendor = require('./auth/loginVendor');
const registerVendor = require('./auth/registerVendor');
const getVendorProfile = require('./auth/vendorProfile');
const verifyVendorOtp = require('./auth/verifyVendorOtp');
const verifyVendorPhone = require('./auth/verifyVendorPhone');
const verifyVendorMailId = require('./auth/verifyVendorMailId');
const getVerifyEmailLink = require('./auth/getVerifyEmailLink');

const getAllocatedBookings = require('./getAllocatedBookings');
const updateBookingStatus = require('./updateBookingStatus');
const uploadBookingInvoice = require('./uploadBookingInvoice');
const vendorUploadDocuments = require('./auth/vendorUploadDocuments');

module.exports = {
  //auth
  getVendorPhoneOtp,
  verifyVendorPhone,
  registerVendor,
  verifyVendorOtp,
  loginVendor,
  getVendorProfile,
  getVerifyEmailLink,
  verifyVendorMailId,
  vendorUploadDocuments,

  getAllocatedBookings,
  updateBookingStatus,
  uploadBookingInvoice,
};
