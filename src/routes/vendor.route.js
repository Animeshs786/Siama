const {
  registerVendor,
  verifyVendorOtp,
  loginVendor,
  getVendorProfile,
  getAllocatedBookings,
  updateBookingStatus,
  uploadBookingInvoice,
} = require('../controllers/vendor');
const { authenticateVendor } = require('../middlewares');

const vendorRoute = require('express').Router();

vendorRoute.post('/register', registerVendor);
vendorRoute.post('/login', loginVendor);
vendorRoute.post('/verify_otp', verifyVendorOtp);
vendorRoute.get('/profile', authenticateVendor, getVendorProfile);
vendorRoute.get('/assign_cat_scat', authenticateVendor, getVendorProfile);

vendorRoute.get('/allocated_bookings', authenticateVendor, getAllocatedBookings);
vendorRoute.patch('/update_booking_status', authenticateVendor, updateBookingStatus);
vendorRoute.post('/upload_booking_invoice', authenticateVendor, uploadBookingInvoice);

module.exports = vendorRoute;
