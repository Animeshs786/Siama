const {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserProfile,
  getServices,
  createBooking,
  payment_webhook,
  // initiatePayment,
  getBookings,
  getAddress,
  addAddress,
  deleteAddress,
  cancleBooking,
  getBooking,
  updateUserProfile,
  getBanners,
  requestCallback,
  addBookingReview,
  requestService,
  getConsults,
  getConsult,
  createConsult,
  initiateConsultPayment,
  getCoupons,
  applyCoupon,
  getHome,
  getSubCategorie,
  addProductCart,
  getProductCart,
  getState,
  getCity,
  updateAddress,
  createCheckout,
  checkoutWebhook,
  getAllCheckout,
  getServicesBySubCat,
  cancelOrderProduct,
  createReview,
  deleteReview,
  getAllServices,
  getAllCondition,
  createLead,
  getAllBlog,
  getBlog,
} = require("../controllers/user");
const deleteUserProfile = require("../controllers/user/auth/deleteUserProfile");
const getBestdeals = require("../controllers/user/getters/getBestdeals");
const { homeApi } = require("../controllers/user/home/getHomeApi");
const getTermsPrivacyAbout = require("../controllers/user/termsPrivacyAbout/getTermsPrivacyAbout");
const addTestLead = require("../controllers/user/testLead/testLead");
const authenticateUser = require("../middlewares/authenticateUser");

const userRoute = require("express").Router();

userRoute.get("/banners", getBanners);
const bodyParser = require("body-parser");
userRoute.get("/bestdeal", getBestdeals);

//---------- auth ----------
userRoute.post("/login", userLogin);
userRoute.post("/verify_otp", verifOtp);
userRoute.post("/signup", userSignup);
userRoute.get("/profile", authenticateUser, getUserProfile);
userRoute.patch("/profile", authenticateUser, updateUserProfile);
userRoute.delete("/profile", authenticateUser, deleteUserProfile);

//---------- address ----------
userRoute.get("/address", authenticateUser, getAddress);
userRoute.post("/address", authenticateUser, addAddress);
userRoute.delete("/address/:id", authenticateUser, deleteAddress);
userRoute.patch("/address/:id", authenticateUser, updateAddress);

userRoute.get("/category", getAllCategories);
userRoute.post("/sub_category", getSubCategories);
userRoute.post("/services", getServices);
userRoute.get("/services_by_categ", getServicesByCategory);
userRoute.get("/service/:id", getServiceDetails);
userRoute.post("/subCategoryDetail", getSubCategorie);
userRoute.post("/servicesBySubcat", getServicesBySubCat);
userRoute.get("/allServices", getAllServices);

// userRoute.get('/cart', authenticateUser, getUserCart);
// userRoute.post('/cart/:id', authenticateUser, addItemToCart);
// userRoute.delete('/cart/:id', authenticateUser, removeCartItem);

//---- booking ----
userRoute.post("/create_booking", authenticateUser, createBooking);
// userRoute.post('/initiate_payment', authenticateUser, initiatePayment);
userRoute.get("/booking", authenticateUser, getBookings);
userRoute.get("/booking/:id", authenticateUser, getBooking);
userRoute.delete("/cancle_booking/:id", authenticateUser, cancleBooking);
userRoute.post("/booking/review", authenticateUser, addBookingReview);

//---- consults ----
userRoute.post("/create_consult", authenticateUser, createConsult);
userRoute.post(
  "/init_consult_payment",
  authenticateUser,
  initiateConsultPayment
);
userRoute.get("/consults", authenticateUser, getConsults);
userRoute.get("/consults/:id", authenticateUser, getConsult);

userRoute.post("/request_callback", authenticateUser, requestCallback);
userRoute.post("/service_request", authenticateUser, requestService);

userRoute.post("/payment_webhook", payment_webhook);

userRoute.get("/coupons", authenticateUser, getCoupons);
userRoute.post("/apply_coupon", authenticateUser, applyCoupon);

//home
userRoute.get("/home", getHome);

//product cart
userRoute.post("/addProductCart", authenticateUser, addProductCart);
userRoute.get("/addProductCart", authenticateUser, getProductCart);

//get State
userRoute.get("/state", getState);

//get City
userRoute.get("/city/:stateId", getCity);

//checkout
userRoute.post("/checkout", authenticateUser, createCheckout);
userRoute.get("/checkout", authenticateUser, getAllCheckout);
userRoute.post(
  "/checkoutWebhook",
  bodyParser.raw({ type: "application/json" }),
  checkoutWebhook
);
userRoute.post("/cancelOrderProduct", authenticateUser, cancelOrderProduct);

//review
userRoute.post("/review", authenticateUser, createReview);
userRoute.delete("/review/:id", authenticateUser, deleteReview);

//condition
userRoute.get("/condition", getAllCondition);

userRoute.post("/lead", createLead);

//blog
userRoute.get("/blog", getAllBlog);
userRoute.get("/blog/:id", getBlog);

userRoute.post("/leadTest", addTestLead);

//home
userRoute.get("/homeApp", homeApi);

userRoute.get("/termsPrivacyAbout", getTermsPrivacyAbout);

module.exports = userRoute;
