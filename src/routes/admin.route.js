const express = require('express');
const adminRoute = express.Router();
const { authenticateAdmin, isAdminLogin, isAdminLogout } = require('../middlewares');
const {
  getLoginPage,
  loginAdmin,
  getDashboard,
  logoutAdmin,
  getIndexPage,
  getCategoryForm,
  addCategory,
  getServiceForm,
  addService,
} = require('../controllers/admin');

adminRoute.get('/', getIndexPage);
adminRoute.get('/login', isAdminLogout, getLoginPage);
adminRoute.post('/login', isAdminLogout, loginAdmin);
adminRoute.get('/logout', isAdminLogin, logoutAdmin);
adminRoute.get('/dashboard', authenticateAdmin, getDashboard);

//service
adminRoute.get('/service', authenticateAdmin, getServiceForm);
adminRoute.post('/service', authenticateAdmin, addService);
// adminRoute.patch('/service/:id', authenticateAdmin, editServiceForm);

//category
adminRoute.get('/category', authenticateAdmin, getCategoryForm);
adminRoute.post('/category', authenticateAdmin, addCategory);

adminRoute.get('/*', (_, res) => res.redirect('/admin/login'));

module.exports = adminRoute;

/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
