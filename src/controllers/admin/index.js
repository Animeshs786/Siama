const addService = require("./service/addService");
const getAdminProfile = require("./auth/getAdminProfile");
const getUsers = require("./user/getUsers");
const loginAdmin = require("./auth/loginAdmin");
const updateAdminProfile = require("./auth/updateAdminProfile");
const getServices = require("./service/getServices");
const deleteService = require("./service/deleteService");
const updateService = require("./service/updateService");
const addCategory = require("./category/addCategory");
const deleteCategory = require("./category/deleteCategory");
const getCategories = require("./category/getCategories");
const updateCategory = require("./category/updateCategory");
const addSubCategory = require("./subcategory/addSubCategory");
const getSubCategories = require("./subcategory/getSubCategories");
const deleteSubCategory = require("./subcategory/deleteSubCategory");
const updateSubCategory = require("./subcategory/updateSubCategory");
const getUnapprovedVendors = require("./vendor/getUnapprovedVendors");
const getVendors = require("./vendor/getVendors");
const approveVendor = require("./vendor/approveVendor");
const assignCategory = require("./vendor/assignCategory");
const assignSubCategory = require("./vendor/assignSubCategory");
const getBookings = require("./booking/getBookings");
const assigneCities = require("./vendor/assignCities");
const allocateBookingToVendor = require("./booking/allocateBookingToVendor");
const confirmBooking = require("./booking/confirmBooking");
const getVendor = require("./vendor/getVendor");
const getBooking = require("./booking/getBooking");
const getUserBookings = require("./user/getUserBookings");
const getVendorBookings = require("./vendor/getVendorBookings");
const addBanner = require("./banner/addBanner");
const getBanners = require("./banner/getBanners");
const getBanner = require("./banner/getBanner");
const deleteBanner = require("./banner/deleteBanner");
const updateBanner = require("./banner/updateBanner");
const editVendor = require("./vendor/editVendor");
const getCallbackRequests = require("./booking/getCallbackRequests");
const getVendorDocs = require("./vendor/getVendorDocs");
const verifyVendorDocs = require("./vendor/verifyVendorDocs");
const getServiceRequests = require("./service/getServiceRequests");
const getAdminOtp = require("./auth/getAdminOtp");
const uploadUserInvoice = require("./booking/uploadUserInvoice");
const getConsults = require("./consult/getConsults");
const setConsultResolved = require("./consult/setConsultResolved");
const getCoupons = require("./coupon/getCoupons");
const addCoupon = require("./coupon/addCoupon");
const updateCoupon = require("./coupon/updateCoupon");
const expireCoupon = require("./coupon/expireCoupon");
const uploadPaymentSlip = require("./vendor/uploadPaymentSlip");
const verifyVendorKYC = require("./vendor/verifyVendorKYC");
const createVendorInbox = require("./vendor/sendVendorMessage");
const home = require("./Home/addHome");
const addState = require("./state/addState");
const getState = require("./state/getState");
const updateState = require("./state/updateState");
const deleteState = require("./state/deleteState");
const addCity = require("./city/addCity");
const getAllCity = require("./city/getAllCity");
const deleteCity = require("./city/deleteCity");
const updateCity = require("./city/updateCity");
const getAllCheckout = require("./checkout/getAllCheckout");
const getHome = require("./Home/getHome");
const getServiceByCat = require("./service/getServiceByCat");
const updateCheckout = require("./checkout/updateCheckout");
const assignVendor = require("./checkout/assignVendor");
const createCondition = require("./condition/createCondition");
const updateCondition = require("./condition/updateCondition");
const deleteCondition = require("./condition/deleteCondition");
const getCondition = require("./condition/getCondition");
const getAllCondition = require("./condition/getAllCondition");
const addFaq = require("./Home/addFaq");
const deleteFaq = require("./Home/deleteFaq");
const updateFaq = require("./Home/updateFaq");
const getAllFaq = require("./Home/getAllFaq");
const getFaq = require("./Home/getFaq");
const { getDashboard } = require("./dashboard/getDashboard");
const getAllLead = require("./lead/getAllLead");
const getLead = require("./lead/getLead");
const updateLead = require("./lead/updateLead");
const deleteLead = require("./lead/deleteLead");
const { createBlog } = require("./blog/createBlog");
const { updateBlog } = require("./blog/updateBlog");
const { deleteBlog } = require("./blog/deleteBlog");
const { getAllBlog } = require("./blog/getAllBlog");
const { getBlog } = require("./blog/getBlog");
// const addBestdeal = require("./bestdeal/addBestdeal");
// const getBestdeals = require("./bestdeal/getBestdeals");
// const getBestdeal = require("./bestdeal/getBestdeal");
// const deleteBestdeal = require("./bestdeal/deleteBestdeal");
// const updateBestdeal = require("./bestdeal/updateBestdeal");

module.exports = {
  loginAdmin,
  getAdminOtp,
  getAdminProfile,
  updateAdminProfile,

  getUsers,
  getUserBookings,

  //---- banner -----
  addBanner,
  getBanners,
  getBanner,
  deleteBanner,
  updateBanner,

  //---- banner -----
  // addBestdeal,
  // getBestdeals,
  // getBestdeal,
  // deleteBestdeal,
  // updateBestdeal,

  addService,
  getServices,
  deleteService,
  updateService,
  getServiceByCat,

  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,

  addSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,

  //---- vendor ----
  getUnapprovedVendors,
  getVendors,
  getVendor,
  editVendor,
  getVendorBookings,
  approveVendor,
  getVendorDocs,
  assignCategory,
  assignSubCategory,
  assigneCities,
  verifyVendorDocs,
  uploadPaymentSlip,
  verifyVendorKYC,
  createVendorInbox,

  //------ booking -------
  getBookings,
  getBooking,
  confirmBooking,
  allocateBookingToVendor,
  uploadUserInvoice,

  //---- consult ----
  getConsults,
  setConsultResolved,

  //----- requests --------
  getCallbackRequests,
  getServiceRequests,

  //---- coupons ----
  getCoupons,
  addCoupon,
  updateCoupon,
  expireCoupon,

  // home
  home,
  getHome,
  addFaq,
  deleteFaq,
  updateFaq,
  getAllFaq,
  getFaq,

  //State
  addState,
  getState,
  updateState,
  deleteState,

  //city
  addCity,
  getAllCity,
  updateCity,
  deleteCity,

  //checkout
  getAllCheckout,
  updateCheckout,
  assignVendor,

  //condition
  createCondition,
  updateCondition,
  deleteCondition,
  getCondition,
  // updateCondition,
  getAllCondition,

  //dashboard
  getDashboard,

  //lead
  getAllLead,
  getLead,
  updateLead,
  deleteLead,

  //blog
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
};
