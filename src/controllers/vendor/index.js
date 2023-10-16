const getVendorPhoneOtp = require('./auth/getVendorPhoneOtp');
const loginVendor = require('./auth/loginVendor');
const registerVendor = require('./auth/registerVendor');
const getVendorProfile = require('./auth/vendorProfile');
const verifyVendorOtp = require('./auth/verifyVendorOtp');
const verifyVendorPhone = require('./auth/verifyVendorPhone');
const verifyVendorMailId = require('./auth/verifyVendorMailId');
const getVerifyEmailLink = require('./auth/getVerifyEmailLink');

const updateBookingStatus = require('./updateBookingStatus');
const uploadBookingInvoice = require('./booking/uploadBookingInvoice');
const vendorUploadDocuments = require('./auth/vendorUploadDocuments');
const getAllocatedBookings = require('./booking/getAllocatedBookings');
const getDeliveredBookings = require('./booking/getDeliveredBookings');
const getOpenBookings = require('./booking/getOpenBookings');

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
  getDeliveredBookings,
  getOpenBookings,
  updateBookingStatus,
  uploadBookingInvoice,
};
