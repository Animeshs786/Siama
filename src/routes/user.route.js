const {
  userLogin,
  verifOtp,
  userSignup,
  getAllCategories,
  getSubCategories,
  getServicesByCategory,
  getServiceDetails,
  getUserCart,
} = require('../controllers/user');
const authenticateUser = require('../middlewares/authenticateUser');

const userRoute = require('express').Router();

userRoute.post('/login', userLogin);
userRoute.post('/verify_otp', verifOtp);
userRoute.post('/signup', userSignup);
userRoute.get('/category', getAllCategories);
userRoute.get('/sub_category', getSubCategories);
userRoute.get('/services_by_categ', getServicesByCategory);
userRoute.get('/service/:id', getServiceDetails);
userRoute.get('/cart', authenticateUser, getUserCart);

module.exports = userRoute;
