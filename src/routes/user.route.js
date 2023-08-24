const { userLogin, verifOtp, userSignup } = require('../controllers/user');

const userRoute = require('express').Router();

userRoute.post('/login', userLogin);
userRoute.post('/verify_otp', verifOtp);
userRoute.post('/signup', userSignup);
module.exports = userRoute;
