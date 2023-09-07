const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');
const getUserCart = require('./cart/getUserCart');
const getAllCategories = require('./getters/getAllCategories');
const getServiceDetails = require('./getters/getServiceDetails');
const getServicesByCategory = require('./getters/getServicesByCategory');
const getSubCategories = require('./getters/getSubcategories');

module.exports = {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserCart,
};
