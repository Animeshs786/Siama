const addService = require('./service/addService');
const getAdminProfile = require('./auth/getAdminProfile');
const getUsers = require('./getUsers');
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
module.exports = {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,

  getUsers,

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

  getUnapprovedVendors,
  getVendors,
  approveVendor,
  assignCategory,
  assignSubCategory,
  //
  getBookings,
};
