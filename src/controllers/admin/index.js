const addCategory = require('./addCategory');
const addService = require('./addService');
const getCategoryForm = require('./getCategoryForm');
const getDashboard = require('./getDashboard');
const getIndexPage = require('./getIndexPage');
const getLoginPage = require('./getLoginPage');
const getServiceForm = require('./getServiceForm');
const loginAdmin = require('./loginAdmin');
const logoutAdmin = require('./logoutAdmin');

module.exports = {
  getLoginPage,
  loginAdmin,
  logoutAdmin,
  getDashboard,
  getIndexPage,
  getCategoryForm,
  getServiceForm,
  addService,
  addCategory,
};
