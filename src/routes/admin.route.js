const express = require('express');
const adminRoute = express.Router();
const { authenticateAdmin } = require('../middlewares');
const {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  addCategory,
  addService,
  getUsers,
  getServices,
  deleteService,
  updateService,
  deleteCategory,
  getCategories,
  updateCategory,
  getSubCategories,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getUnapprovedVendors,
  getVendors,
  approveVendor,
  assignCategory,
  assignSubCategory,
  getBookings,
  assigneCities,
  allocateBookingToVendor,
  confirmBooking,
  getVendor,
  getBooking,
  getUserBookings,
  getVendorBookings,
  addBanner,
  getBanners,
  getBanner,
  deleteBanner,
  updateBanner,
  editVendor,
  getCallbackRequests,
  getVendorDocs,
  verifyVendorDocs,
  getServiceRequests,
  getAdminOtp,
  uploadUserInvoice,
  getConsults,
  setConsultResolved,
} = require('../controllers/admin');

adminRoute.post('/login', loginAdmin);
adminRoute.post('/get_otp', getAdminOtp);
//========= protected ================================
adminRoute.use(authenticateAdmin);
//--------- auth -------------------------------------
adminRoute.get('/profile', getAdminProfile);
adminRoute.patch('/profile', updateAdminProfile);

//--------- user -------------------------------------
adminRoute.get('/users', getUsers);
adminRoute.post('/users/bookings', getUserBookings);

//--------- Banner ----------------------------------
adminRoute.get('/banners', getBanners);
adminRoute.get('/banners/:id', getBanner);
adminRoute.post('/banners', addBanner);
adminRoute.patch('/banners/:id', updateBanner);
adminRoute.delete('/banners/:id', deleteBanner);

//--------- service ----------------------------------
adminRoute.post('/service', addService);
adminRoute.get('/service', getServices);
adminRoute.delete('/service/:id', deleteService);
adminRoute.patch('/service/:id', updateService);

//--------- category ---------------------------------
adminRoute.get('/category', getCategories);
adminRoute.post('/category', addCategory);
adminRoute.delete('/category/:id', deleteCategory);
adminRoute.patch('/category/:id', updateCategory);

//--------- sub category -----------------------------
adminRoute.get('/subcategory', getSubCategories);
adminRoute.post('/subcategory', addSubCategory);
adminRoute.delete('/subcategory/:id', deleteSubCategory);
adminRoute.patch('/subcategory/:id', updateSubCategory);

//--------- vendor -----------------------------------
adminRoute.get('/vendor', getVendors); //should be /vendors
adminRoute.get('/vendor/:id', getVendor); //should be /vendors/:id
adminRoute.patch('/vendor/:id', editVendor); //should be /vendors/:id
adminRoute.patch('/appr_vendor/:id', approveVendor);
adminRoute.post('/vendors/bookings', getVendorBookings);
adminRoute.get('/unapprove_vendor', getUnapprovedVendors);
adminRoute.patch('/assign_categ/:vendor', assignCategory);
adminRoute.patch('/assign_scateg/:vendor', assignSubCategory);
adminRoute.patch('/assign_cities/:vendor', assigneCities);
adminRoute.get('/vendors/:id/docs', getVendorDocs);
adminRoute.patch('/vendors/:id/docs', verifyVendorDocs);
//---- bookings ----
adminRoute.get('/bookings', getBookings); //should be /bookings
adminRoute.get('/bookings/:id', getBooking); ////should be /bookings/:id
adminRoute.patch('/confirm_booking/:id', confirmBooking);
adminRoute.post('/allocate_booking', allocateBookingToVendor);
adminRoute.post('/upload_user_invoice', uploadUserInvoice);

//---- consult ----
adminRoute.get('/consults', getConsults);
adminRoute.patch('/consult_resolved/:id', setConsultResolved);

//-------------- requests -----------------------------------
adminRoute.get('/callback_requests', getCallbackRequests);
adminRoute.get('/service_requests', getServiceRequests);

module.exports = adminRoute;
/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
