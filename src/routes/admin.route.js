const express = require('express');
const adminRoute = express.Router();
const { getLoginPage, loginAdmin, getDashboard, logoutAdmin } = require('../controllers/admin');
const { authenticateAdmin, isAdminLogin, isAdminLogout } = require('../middlewares');

adminRoute.get('/login', isAdminLogout, getLoginPage);
adminRoute.post('/login', isAdminLogout, loginAdmin);
adminRoute.get('/dashboard', authenticateAdmin, getDashboard);
adminRoute.get('/logout', isAdminLogin, logoutAdmin);
adminRoute.get('/*', (_, res) => res.redirect('/admin/login'));

module.exports = adminRoute;

/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
