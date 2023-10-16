const addAddress = require('./address/addAddress');
const deleteAddress = require('./address/deleteAddress');
const getAddress = require('./address/getAddress');
const getUserProfile = require('./auth/getUserProfile');
const updateUserProfile = require('./auth/updateUserProfile');
const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');
const cancleBooking = require('./booking/cancleBooking');
const createBooking = require('./booking/createBooking');
const getBooking = require('./booking/getBooking');
const getBookings = require('./booking/getBookings');
const requestCallback = require('./booking/requestCallback');
const addItemToCart = require('./cart/addItemToCart');
const getUserCart = require('./cart/getUserCart');
const removeCartItem = require('./cart/removeCartItem');
const updateCartItem = require('./cart/updateCartItem');
const getAllCategories = require('./getters/getAllCategories');
const getBanners = require('./getters/getBanners');
const getServiceDetails = require('./getters/getServiceDetails');
const getServices = require('./getters/getServices');
const getServicesByCategory = require('./getters/getServicesByCategory');
const getSubCategories = require('./getters/getSubcategories');
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
  //booking
  createBooking,
  cancleBooking,
  getBookings,
  getBooking,

  requestCallback,
  //
  initiatePayment,
  payment_webhook,
};
