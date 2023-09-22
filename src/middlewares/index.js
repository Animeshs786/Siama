const authenticateAdmin = require('./authenticateAdmin');
const authenticateUser = require('./authenticateUser');
const authenticateVendor = require('./authenticateVendor');

module.exports = {
  authenticateUser,
  authenticateAdmin,
  authenticateVendor,
};
