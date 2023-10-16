const {
  registerVendor,
  verifyVendorOtp,
  loginVendor,
  getVendorProfile,
  getAllocatedBookings,
  updateBookingStatus,
  uploadBookingInvoice,
  getVendorPhoneOtp,
  verifyVendorPhone,
  verifyVendorMailId,
  getVerifyEmailLink,
  vendorUploadDocuments,
  getDeliveredBookings,
  getOpenBookings,
} = require('../controllers/vendor');
const { authenticateVendor } = require('../middlewares');

const vendorRoute = require('express').Router();

vendorRoute.post('/getPhoneOtp', getVendorPhoneOtp);
vendorRoute.post('/verifyPhone', verifyVendorPhone);
vendorRoute.post('/register', registerVendor);
vendorRoute.post('/login', loginVendor);
vendorRoute.post('/verify_otp', verifyVendorOtp);
vendorRoute.get('/profile', authenticateVendor, getVendorProfile);

vendorRoute.get('/get_verify_email_link', authenticateVendor, getVerifyEmailLink);
vendorRoute.get('/verify_email/:token', authenticateVendor, verifyVendorMailId);
vendorRoute.post('/upload_documents', authenticateVendor, vendorUploadDocuments);

vendorRoute.get('/allocated_bookings', authenticateVendor, getAllocatedBookings);
vendorRoute.get('/delivered_bookings', authenticateVendor, getDeliveredBookings);
vendorRoute.get('/open_bookings', authenticateVendor, getOpenBookings);
vendorRoute.patch('/update_booking_status', authenticateVendor, updateBookingStatus);
vendorRoute.post('/upload_booking_invoice', authenticateVendor, uploadBookingInvoice);

module.exports = vendorRoute;
