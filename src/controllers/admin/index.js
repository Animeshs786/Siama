const addService = require('./service/addService');
const getAdminProfile = require('./auth/getAdminProfile');
const getUsers = require('./user/getUsers');
const loginAdmin = require('./auth/loginAdmin');
const updateAdminProfile = require('./auth/updateAdminProfile');
const getServices = require('./service/getServices');
const deleteService = require('./service/deleteService');
const updateService = require('./service/updateService');
const addCategory = require('./category/addCategory');
const deleteCategory = require('./category/deleteCategory');
const getCategories = require('./category/getCategories');
const updateCategory = require('./category/updateCategory');
const addSubCategory = require('./subcategory/addSubCategory');
const getSubCategories = require('./subcategory/getSubCategories');
const deleteSubCategory = require('./subcategory/deleteSubCategory');
const updateSubCategory = require('./subcategory/updateSubCategory');
const getUnapprovedVendors = require('./vendor/getUnapprovedVendors');
const getVendors = require('./vendor/getVendors');
const approveVendor = require('./vendor/approveVendor');
const assignCategory = require('./vendor/assignCategory');
const assignSubCategory = require('./vendor/assignSubCategory');
const getBookings = require('./booking/getBookings');
const assigneCities = require('./vendor/assignCities');
const allocateBookingToVendor = require('./booking/allocateBookingToVendor');
const confirmBooking = require('./booking/confirmBooking');
const getVendor = require('./vendor/getVendor');
const getBooking = require('./booking/getBooking');
const getUserBookings = require('./user/getUserBookings');
const getVendorBookings = require('./vendor/getVendorBookings');
const addBanner = require('./banner/addBanner');
const getBanners = require('./banner/getBanners');
const getBanner = require('./banner/getBanner');
const deleteBanner = require('./banner/deleteBanner');
const updateBanner = require('./banner/updateBanner');
const editVendor = require('./vendor/editVendor');
const getCallbackRequests = require('./booking/getCallbackRequests');
const getVendorDocs = require('./vendor/getVendorDocs');
const verifyVendorDocs = require('./vendor/verifyVendorDocs');
const getServiceRequests = require('./service/getServiceRequests');
const getAdminOtp = require('./auth/getAdminOtp');
const uploadUserInvoice = require('./booking/uploadUserInvoice');
const getConsults = require('./consult/getConsults');
const setConsultResolved = require('./consult/setConsultResolved');
const getCoupons = require('./coupon/getCoupons');
const addCoupon = require('./coupon/addCoupon');
const updateCoupon = require('./coupon/updateCoupon');
const expireCoupon = require('./coupon/expireCoupon');
const uploadPaymentSlip = require('./vendor/uploadPaymentSlip');
const verifyVendorKYC = require('./vendor/verifyVendorKYC');

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

  addService,
  getServices,
  deleteService,
  updateService,

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
};
