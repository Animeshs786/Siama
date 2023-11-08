const {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserProfile,
  getServices,
  createBooking,
  payment_webhook,
  initiatePayment,
  getBookings,
  getAddress,
  addAddress,
  deleteAddress,
  cancleBooking,
  getBooking,
  updateUserProfile,
  getBanners,
  requestCallback,
  addBookingReview,
  requestService,
  getConsults,
  getConsult,
  createConsult,
  initiateConsultPayment,
  getCoupons,
  applyCoupon,
} = require('../controllers/user');
const authenticateUser = require('../middlewares/authenticateUser');

const userRoute = require('express').Router();

userRoute.get('/banners', getBanners);

//---------- auth ----------
userRoute.post('/login', userLogin);
userRoute.post('/verify_otp', verifOtp);
userRoute.post('/signup', userSignup);
userRoute.get('/profile', authenticateUser, getUserProfile);
userRoute.patch('/profile', authenticateUser, updateUserProfile);

//---------- address ----------
userRoute.get('/address', authenticateUser, getAddress);
userRoute.post('/address', authenticateUser, addAddress);
userRoute.delete('/address/:id', authenticateUser, deleteAddress);

userRoute.get('/category', getAllCategories);
userRoute.get('/sub_category', getSubCategories);
userRoute.get('/services', getServices);
userRoute.get('/services_by_categ', getServicesByCategory);
userRoute.get('/service/:id', getServiceDetails);

// userRoute.get('/cart', authenticateUser, getUserCart);
// userRoute.post('/cart/:id', authenticateUser, addItemToCart);
// userRoute.delete('/cart/:id', authenticateUser, removeCartItem);

//---- booking ----
userRoute.post('/create_booking', authenticateUser, createBooking);
userRoute.post('/initiate_payment', authenticateUser, initiatePayment);
userRoute.get('/booking', authenticateUser, getBookings);
userRoute.get('/booking/:id', authenticateUser, getBooking);
userRoute.delete('/cancle_booking/:id', authenticateUser, cancleBooking);
userRoute.post('/booking/review', authenticateUser, addBookingReview);

//---- consults ----
userRoute.post('/create_consult', authenticateUser, createConsult);
userRoute.post('/init_consult_payment', authenticateUser, initiateConsultPayment);
userRoute.get('/consults', authenticateUser, getConsults);
userRoute.get('/consults/:id', authenticateUser, getConsult);

userRoute.post('/request_callback', authenticateUser, requestCallback);
userRoute.post('/service_request', authenticateUser, requestService);

userRoute.post('/payment_webhook', payment_webhook);

userRoute.get('/coupons', authenticateUser, getCoupons);
userRoute.post('/apply_coupon', authenticateUser, applyCoupon);

module.exports = userRoute;
