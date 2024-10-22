const express = require("express");
const adminRoute = express.Router();
const { authenticateAdmin } = require("../middlewares");
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
  getCoupons,
  addCoupon,
  updateCoupon,
  expireCoupon,
  uploadPaymentSlip,
  verifyVendorKYC,
  home,
  getHome,
  getState,
  addState,
  deleteState,
  updateState,
  getAllCity,
  addCity,
  updateCity,
  deleteCity,
  getAllCheckout,
  getServiceByCat,
  updateCheckout,
  assignVendor,
  createCondition,
  updateCondition,
  deleteCondition,
  getAllCondition,
  getCondition,
  addFaq,
  updateFaq,
  getAllFaq,
  deleteFaq,
  getFaq,
  getDashboard,
  getAllLead,
  getLead,
  updateLead,
  deleteLead,
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  // getBestdeals,
  // getBestdeal,
  // addBestdeal,
  // updateBestdeal,
  // deleteBestdeal,
} = require("../controllers/admin");
const sendVendorMessage = require("../controllers/admin/vendor/sendVendorMessage");
const getBestdeals = require("../controllers/admin/bestdeal/getBestdeals");
const getBestdeal = require("../controllers/admin/bestdeal/getBestdeal");
const addBestdeal = require("../controllers/admin/bestdeal/addBestdeal");
const updateBestdeal = require("../controllers/admin/bestdeal/updateBestdeal");
const deleteBestdeal = require("../controllers/admin/bestdeal/deleteBestdeal");

adminRoute.post("/login", loginAdmin);
adminRoute.post("/get_otp", getAdminOtp);
//========= protected ================================
// adminRoute.use(authenticateAdmin);
//--------- auth -------------------------------------
adminRoute.get("/profile", getAdminProfile);
adminRoute.patch("/profile", updateAdminProfile);

adminRoute.get("/dashboard", getDashboard);

//--------- user -------------------------------------
adminRoute.get("/users", getUsers);
adminRoute.post("/users/bookings", getUserBookings);

//--------- Banner ----------------------------------
adminRoute.get("/banners", getBanners);
adminRoute.get("/banners/:id", getBanner);
adminRoute.post("/banners", addBanner);
adminRoute.patch("/banners/:id", updateBanner);
adminRoute.delete("/banners/:id", deleteBanner);

//--------- Best Deals ----------------------------------
adminRoute.get("/bestdeal", getBestdeals);
adminRoute.get("/bestdeal/:id", getBestdeal);
adminRoute.post("/bestdeal", addBestdeal);
adminRoute.patch("/bestdeal/:id", updateBestdeal);
adminRoute.delete("/bestdeal/:id", deleteBestdeal);

//--------- service ----------------------------------
adminRoute.post("/service", addService);
adminRoute.get("/service", getServices);
adminRoute.delete("/service/:id", deleteService);
adminRoute.patch("/service/:id", updateService);
adminRoute.post("/serviceByCat", getServiceByCat);

//--------- category ---------------------------------
adminRoute.get("/category", getCategories);
adminRoute.post("/category", addCategory);
adminRoute.delete("/category/:id", deleteCategory);
adminRoute.patch("/category/:id", updateCategory);

//--------- sub category -----------------------------
adminRoute.get("/subcategory", getSubCategories);
adminRoute.post("/subcategory", addSubCategory);
adminRoute.delete("/subcategory/:id", deleteSubCategory);
adminRoute.patch("/subcategory/:id", updateSubCategory);

//--------- vendor -----------------------------------
adminRoute.post("/vendor", getVendors); //should be /vendors
adminRoute.get("/vendor/:id", getVendor); //should be /vendors/:id
adminRoute.patch("/vendor/:id", editVendor); //should be /vendors/:id
adminRoute.patch("/appr_vendor/:id", approveVendor);
adminRoute.post("/vendors/bookings", getVendorBookings);
adminRoute.get("/unapprove_vendor", getUnapprovedVendors);
adminRoute.patch("/assign_categ/:vendor", assignCategory);
adminRoute.patch("/assign_scateg/:vendor", assignSubCategory);
adminRoute.patch("/assign_cities/:vendor", assigneCities);
adminRoute.get("/vendors/:id/docs", getVendorDocs);
adminRoute.patch("/vendors/:id/docs", verifyVendorDocs);
adminRoute.post("/upload_vendor_payslip", uploadPaymentSlip);
adminRoute.get("/verify_vendor_kyc/:id", verifyVendorKYC);
adminRoute.post("/send_vendor_msg", sendVendorMessage);

//---- bookings ----
adminRoute.get("/bookings", getBookings); //should be /bookings
adminRoute.get("/bookings/:id", getBooking); ////should be /bookings/:id
adminRoute.patch("/confirm_booking/:id", confirmBooking);
adminRoute.post("/allocate_booking", allocateBookingToVendor);
adminRoute.post("/upload_user_invoice", uploadUserInvoice);

//---- consult ----
adminRoute.get("/consults", getConsults);
adminRoute.patch("/consult_resolved/:id", setConsultResolved);

//-------------- requests -----------------------------------
adminRoute.get("/callback_requests", getCallbackRequests);
adminRoute.get("/service_requests", getServiceRequests);

//---- coupons ----
adminRoute.get("/coupons", getCoupons);
adminRoute.post("/coupons", addCoupon);
adminRoute.patch("/coupons/:id", updateCoupon);
adminRoute.delete("/coupons/:id", expireCoupon);

//home
adminRoute.post("/home", home);
adminRoute.get("/home", getHome);
adminRoute.post("/faq", addFaq);
adminRoute.patch("/faq", updateFaq);
adminRoute.get("/faq", getAllFaq);
adminRoute.get("/faq/:faqId", getFaq);
adminRoute.delete("/faq", deleteFaq);

//state
adminRoute.route("/state").get(getState).post(addState);
adminRoute.route("/state/:id").delete(deleteState).patch(updateState);

//city
adminRoute.route("/city").get(getAllCity).post(addCity);
adminRoute.route("/city/:id").patch(updateCity).delete(deleteCity);

//checkout
adminRoute.get("/checkout", getAllCheckout);
adminRoute.patch("/checkout/:id", updateCheckout);
adminRoute.post("/assignVendor/", assignVendor);

//condition
adminRoute.route("/condition").get(getAllCondition).post(createCondition);
adminRoute
  .route("/condition/:id")
  .patch(updateCondition)
  .delete(deleteCondition)
  .get(getCondition);

//blog
adminRoute.route("/blog").get(getAllBlog).post(createBlog);
adminRoute.route("/blog/:id").patch(updateBlog).delete(deleteBlog).get(getBlog);

//lead
adminRoute.route("/lead").get(getAllLead);
adminRoute.route("/lead/:id").get(getLead).patch(updateLead).delete(deleteLead);
module.exports = adminRoute;

/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
