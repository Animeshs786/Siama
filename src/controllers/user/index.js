const addAddress = require("./address/addAddress");
const deleteAddress = require("./address/deleteAddress");
const getAddress = require("./address/getAddress");
const updateAddress = require("./address/updateAddress");
const getUserProfile = require("./auth/getUserProfile");
const updateUserProfile = require("./auth/updateUserProfile");
const userLogin = require("./auth/userLogin");
const userSignup = require("./auth/userSignup");
const verifOtp = require("./auth/verifyOtp");
const { getAllBlog } = require("./blog/getAllBlog");
const { getBlog } = require("./blog/getBlog");
const addBookingReview = require("./booking/addBookingReview");
const applyCoupon = require("./booking/applyCoupon");
const cancleBooking = require("./booking/cancleBooking");
const createBooking = require("./booking/createBooking");
const getBooking = require("./booking/getBooking");
const getBookings = require("./booking/getBookings");
const requestCallback = require("./booking/requestCallback");
const requestService = require("./booking/requestService");
const addItemToCart = require("./cart/addItemToCart");
const getUserCart = require("./cart/getUserCart");
const removeCartItem = require("./cart/removeCartItem");
const updateCartItem = require("./cart/updateCartItem");
const cancelOrderProduct = require("./checkout/cancelOrderProduct");
const checkoutWebhook = require("./checkout/checkoutWebhook");
const createCheckout = require("./checkout/createCheckout");
const getAllCheckout = require("./checkout/getAllCheckout");
const getCity = require("./city/getCity");
const getAllCondition = require("./condition/getAllCondition");
const createConsult = require("./consult/createConsult");
const getConsult = require("./consult/getConsult");
const getConsults = require("./consult/getConsults");
const getCoupons = require("./coupon/getCoupons");
const getAllCategories = require("./getters/getAllCategories");
const getAllServices = require("./getters/getAllService");
const getBanners = require("./getters/getBanners");
const getServiceDetails = require("./getters/getServiceDetails");
const getServices = require("./getters/getServices");
const getServicesByCategory = require("./getters/getServicesByCategory");
const getServicesBySubCat = require("./getters/getServicesBySubCat");
const getSubCategorie = require("./getters/getSubCategorie");
const getSubCategories = require("./getters/getSubcategories");
const getHome = require("./home/getHome");
const createLead = require("./lead/createLead");
const initiateConsultPayment = require("./payment/initiateConsultPayment");
// const initiatePayment = require('./payment/initiatePayment');
const payment_webhook = require("./payment/payment_webhook");
const addProductCart = require("./productCart.js/addProductCart");
const getProductCart = require("./productCart.js/getProductCart");
const createReview = require("./review/createReview");
const deleteReview = require("./review/deleteReview");
const getState = require("./state/getState");

module.exports = {
  getBanners,

  //authentication
  userLogin,
  verifOtp,
  userSignup,
  getUserProfile,
  updateUserProfile,

  //address
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,

  //category and subcategory
  getAllCategories,
  getSubCategories,
  getSubCategorie,

  //service
  getServicesByCategory,
  getServices,
  getServiceDetails,
  getServicesBySubCat,
  getAllServices,

  //cart
  getUserCart,
  addItemToCart,
  removeCartItem,
  updateCartItem,
  //---- booking ----
  createBooking,
  // initiatePayment,
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

  getCoupons,
  applyCoupon,

  //home
  getHome,

  //productCart
  addProductCart,
  getProductCart,

  //state
  getState,

  //city
  getCity,

  //checkout
  createCheckout,
  checkoutWebhook,
  getAllCheckout,
  cancelOrderProduct,

  //review
  deleteReview,
  createReview,

  //condition

  getAllCondition,

  //blog
  getAllBlog,
  getBlog,

  //lead
  createLead,
};
