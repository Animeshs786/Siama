const userLogin = require('./auth/userLogin');
const userSignup = require('./auth/userSignup');
const verifOtp = require('./auth/verifyOtp');

module.exports = {
  userLogin,
  verifOtp,
  userSignup,
};
