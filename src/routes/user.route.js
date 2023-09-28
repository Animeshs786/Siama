const {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserCart,
  addItemToCart,
  removeCartItem,
  getUserProfile,
  getServices,
  createBooking,
  payment_webhook,
  initiatePayment,
  getBookings,
} = require('../controllers/user');
const authenticateUser = require('../middlewares/authenticateUser');

const userRoute = require('express').Router();

userRoute.post('/login', userLogin);
userRoute.post('/verify_otp', verifOtp);
userRoute.post('/signup', userSignup);
userRoute.get('/profile', authenticateUser, getUserProfile);

userRoute.get('/category', getAllCategories);
userRoute.get('/sub_category', getSubCategories);
userRoute.get('/services', getServices);
userRoute.get('/services_by_categ', getServicesByCategory);
userRoute.get('/service/:id', getServiceDetails);

userRoute.get('/cart', authenticateUser, getUserCart);
userRoute.post('/cart/:id', authenticateUser, addItemToCart);
userRoute.delete('/cart/:id', authenticateUser, removeCartItem);

userRoute.post('/create_booking', authenticateUser, createBooking);
userRoute.get('/booking', authenticateUser, getBookings);

//payment
// userRoute.post('/initiate_payment', authenticateUser, initiatePayment);
userRoute.post('/initiate_payment', initiatePayment);
userRoute.post('/payment_webhook', payment_webhook);

module.exports = userRoute;
