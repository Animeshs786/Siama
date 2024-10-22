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
  updateVendorProfile,
  getInbox,
  updateBankDetails,
  getInvoices,
  getAllTexes,
  vendorUploadDocument,
  getCustomerReviews,
  getHomeData,
  downloadPayslip,
  mailPayslip,
  getAssignedCheckout,
} = require('../controllers/vendor');
const { authenticateVendor } = require('../middlewares');

const vendorRoute = require('express').Router();

vendorRoute.post('/getPhoneOtp', getVendorPhoneOtp);
vendorRoute.post('/verifyPhone', verifyVendorPhone);
vendorRoute.post('/register', registerVendor);
vendorRoute.post('/login', loginVendor);
vendorRoute.post('/verify_otp', verifyVendorOtp);
vendorRoute.get('/profile', authenticateVendor, getVendorProfile);
vendorRoute.patch('/profile', authenticateVendor, updateVendorProfile);

vendorRoute.get('/get_verify_email_link', authenticateVendor, getVerifyEmailLink);
vendorRoute.get('/verify_email/:token', authenticateVendor, verifyVendorMailId);

vendorRoute.get('/home_data', authenticateVendor, getHomeData);

vendorRoute.post('/upload_documents', authenticateVendor, vendorUploadDocuments);
vendorRoute.post('/upload_documents/:doc', authenticateVendor, vendorUploadDocument);

vendorRoute.get('/allocated_bookings', authenticateVendor, getAllocatedBookings);
vendorRoute.get('/delivered_bookings', authenticateVendor, getDeliveredBookings);
vendorRoute.get('/open_bookings', authenticateVendor, getOpenBookings);
vendorRoute.patch('/update_booking_status', authenticateVendor, updateBookingStatus);
vendorRoute.post('/upload_booking_invoice', authenticateVendor, uploadBookingInvoice);
vendorRoute.get('/download_payment_slip/:booking', authenticateVendor, downloadPayslip);
vendorRoute.get('/mail_payment_slip/:booking', authenticateVendor, mailPayslip);

vendorRoute.get('/inbox', authenticateVendor, getInbox);

vendorRoute.patch('/bank_details', authenticateVendor, updateBankDetails);
vendorRoute.get('/invoices', authenticateVendor, getInvoices);
vendorRoute.get('/taxes', authenticateVendor, getAllTexes);

vendorRoute.get('/customer_reviews', authenticateVendor, getCustomerReviews);

vendorRoute.get('/assignedCheckout', authenticateVendor, getAssignedCheckout);

module.exports = vendorRoute;
