const getUserProfile = require('./auth/getUserProfile');
const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');
const createBooking = require('./booking/createBooking');
const getBookings = require('./booking/getBookings');
const addItemToCart = require('./cart/addItemToCart');
const getUserCart = require('./cart/getUserCart');
const removeCartItem = require('./cart/removeCartItem');
const updateCartItem = require('./cart/updateCartItem');
const getAllCategories = require('./getters/getAllCategories');
const getServiceDetails = require('./getters/getServiceDetails');
const getServices = require('./getters/getServices');
const getServicesByCategory = require('./getters/getServicesByCategory');
const getSubCategories = require('./getters/getSubcategories');
const initiatePayment = require('./payment/initiatePayment');
const payment_webhook = require('./payment/payment_webhook');

module.exports = {
  //authentication
  userLogin,
  verifOtp,
  userSignup,
  getUserProfile,

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
  //booking
  createBooking,
  getBookings,
  initiatePayment,
  payment_webhook,
};
