const {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserCart,
  addItemToCart,
  removeCartItem,
  getUserProfile,
  getServices,
} = require('../controllers/user');
const authenticateUser = require('../middlewares/authenticateUser');

const userRoute = require('express').Router();

userRoute.post('/login', userLogin);
userRoute.post('/verify_otp', verifOtp);
userRoute.post('/signup', userSignup);
userRoute.get('/profile', authenticateUser, getUserProfile);
userRoute.get('/category', getAllCategories);
userRoute.get('/sub_category', getSubCategories);
userRoute.get('/services', getServices);
userRoute.get('/services_by_categ', getServicesByCategory);
userRoute.get('/service/:id', getServiceDetails);
userRoute.get('/cart', authenticateUser, getUserCart);
userRoute.post('/cart/:id', authenticateUser, addItemToCart);
userRoute.delete('/cart/:id', authenticateUser, removeCartItem);
// userRoute.patch('/cart/:id', authenticateUser, updateCartItem);

module.exports = userRoute;
