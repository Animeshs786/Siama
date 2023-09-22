const { registerVendor, verifyVendorOtp, loginVendor, getVendorProfile } = require('../controllers/vendor');
const { authenticateVendor } = require('../middlewares');

const vendorRoute = require('express').Router();

vendorRoute.post('/register', registerVendor);
vendorRoute.post('/login', loginVendor);
vendorRoute.post('/verify_otp', verifyVendorOtp);
vendorRoute.get('/profile', authenticateVendor, getVendorProfile);
vendorRoute.get('/assign_cat_scat', authenticateVendor, getVendorProfile);

module.exports = vendorRoute;
