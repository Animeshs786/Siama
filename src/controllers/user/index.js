const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');
const addItemToCart = require('./cart/addItemToCart');
const getUserCart = require('./cart/getUserCart');
const removeCartItem = require('./cart/removeCartItem');
const updateCartItem = require('./cart/updateCartItem');
const getAllCategories = require('./getters/getAllCategories');
const getServiceDetails = require('./getters/getServiceDetails');
const getServicesByCategory = require('./getters/getServicesByCategory');
const getSubCategories = require('./getters/getSubcategories');

module.exports = {
  //authentication
  userLogin,
  verifOtp,
  userSignup,

  //category and subcategory
  getAllCategories,
  getSubCategories,

  //service
  getServicesByCategory,
  getServiceDetails,

  //cart
  getUserCart,
  addItemToCart,
  removeCartItem,
  updateCartItem,
};
