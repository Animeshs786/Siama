const mongoose = require('mongoose');

const getOtp = require('./getOtp');
const verifyAccessToken = require('./verifyAccessToken');

const isValidMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  getOtp,
  isValidMongoId,
  verifyAccessToken,
};
