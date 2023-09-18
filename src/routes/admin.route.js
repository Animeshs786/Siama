const express = require('express');
const adminRoute = express.Router();
const { authenticateAdmin, isAdminLogin, isAdminLogout } = require('../middlewares');
const {
  getLoginPage,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getDashboard,
  getIndexPage,
  getCategoryForm,
  addCategory,
  getServiceForm,
  addService,
  getUsers,
  getServices,
  deleteService,
  updateService,
  deleteCategory,
  getCategories,
  updateCategory,
  getSubCategories,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require('../controllers/admin');

// adminRoute.get('/', getIndexPage);
// adminRoute.get('/login', isAdminLogout, getLoginPage);
adminRoute.post('/login', loginAdmin);
adminRoute.get('/profile', authenticateAdmin, getAdminProfile);
adminRoute.patch('/profile', authenticateAdmin, updateAdminProfile);
adminRoute.get('/users', authenticateAdmin, getUsers);
//
adminRoute.post('/service', authenticateAdmin, addService);
adminRoute.get('/service', authenticateAdmin, getServices);
adminRoute.delete('/service/:id', authenticateAdmin, deleteService);
adminRoute.patch('/service/:id', authenticateAdmin, updateService);

adminRoute.get('/category', authenticateAdmin, getCategories);
adminRoute.post('/category', authenticateAdmin, addCategory);
adminRoute.delete('/category/:id', authenticateAdmin, deleteCategory);
adminRoute.patch('/category/:id', authenticateAdmin, updateCategory);

adminRoute.get('/subcategory', authenticateAdmin, getSubCategories);
adminRoute.post('/subcategory', authenticateAdmin, addSubCategory);
adminRoute.delete('/subcategory/:id', authenticateAdmin, deleteSubCategory);
adminRoute.patch('/subcategory/:id', authenticateAdmin, updateSubCategory);
//service
// adminRoute.get('/service', authenticateAdmin, getServiceForm);
// adminRoute.post('/service', authenticateAdmin, addService);
// adminRoute.patch('/service/:id', authenticateAdmin, editServiceForm);

//category
// adminRoute.get('/category', authenticateAdmin, getCategoryForm);
// adminRoute.post('/category', authenticateAdmin, addCategory);

// adminRoute.get('/*', (_, res) => res.redirect('/admin/login'));

module.exports = adminRoute;

/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
