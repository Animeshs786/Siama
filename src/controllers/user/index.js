const addAddress = require('./address/addAddress');
const deleteAddress = require('./address/deleteAddress');
const getAddress = require('./address/getAddress');
const getUserProfile = require('./auth/getUserProfile');
const updateUserProfile = require('./auth/updateUserProfile');
const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');
const addBookingReview = require('./booking/addBookingReview');
const cancleBooking = require('./booking/cancleBooking');
const createBooking = require('./booking/createBooking');
const getBooking = require('./booking/getBooking');
const getBookings = require('./booking/getBookings');
const requestCallback = require('./booking/requestCallback');
const requestService = require('./booking/requestService');
const addItemToCart = require('./cart/addItemToCart');
const getUserCart = require('./cart/getUserCart');
const removeCartItem = require('./cart/removeCartItem');
const updateCartItem = require('./cart/updateCartItem');
const createConsult = require('./consult/createConsult');
const getConsult = require('./consult/getConsult');
const getConsults = require('./consult/getConsults');
const getAllCategories = require('./getters/getAllCategories');
const getBanners = require('./getters/getBanners');
const getServiceDetails = require('./getters/getServiceDetails');
const getServices = require('./getters/getServices');
const getServicesByCategory = require('./getters/getServicesByCategory');
const getSubCategories = require('./getters/getSubcategories');
const initiateConsultPayment = require('./payment/initiateConsultPayment');
const initiatePayment = require('./payment/initiatePayment');
const payment_webhook = require('./payment/payment_webhook');

module.exports = {
  getBanners,

  //authentication
  userLogin,
  verifOtp,
  userSignup,
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress,
  getAddress,

  //category and subcategory
  getAllCategories,
  getSubCategories,

  //service
  getServicesByCategory,
  getServices,
  getServiceDetails,

  //cart
  getUserCart,
  addItemToCart,
  removeCartItem,
  updateCartItem,
  //---- booking ----
  createBooking,
  initiatePayment,
  cancleBooking,
  getBookings,
  getBooking,
  addBookingReview,

  //---- consult ----
  createConsult,
  initiateConsultPayment,
  getConsults,
  getConsult,

  requestCallback,
  requestService,
  //
  payment_webhook,
};
