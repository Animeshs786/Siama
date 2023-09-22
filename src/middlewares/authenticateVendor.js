const { ApiError } = require('../errorHandler');
const { Vendor } = require('../models');
const { verifyAccessToken } = require('../utils');

const authenticateVendor = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const legit = verifyAccessToken(token);
    const vendor = await Vendor.findById(legit.id);
    if (vendor) {
      req.vendor = vendor;
      req.token = token;
      return next();
    }
    throw new ApiError('Access forbidden', 403);
  } catch (err) {
    next(err);
  }
};

module.exports = authenticateVendor;
