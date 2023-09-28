const express = require('express');
const adminRoute = express.Router();
const { authenticateAdmin } = require('../middlewares');
const {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  addCategory,
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
  getUnapprovedVendors,
  getVendors,
  approveVendor,
  assignCategory,
  assignSubCategory,
  getBookings,
} = require('../controllers/admin');

adminRoute.post('/login', loginAdmin);
//========= protected ================================
adminRoute.use(authenticateAdmin);
//--------- user -------------------------------------
adminRoute.get('/profile', getAdminProfile);
adminRoute.patch('/profile', updateAdminProfile);
adminRoute.get('/users', getUsers);
//--------- service ----------------------------------
adminRoute.post('/service', addService);
adminRoute.get('/service', getServices);
adminRoute.delete('/service/:id', deleteService);
adminRoute.patch('/service/:id', updateService);
//--------- category ---------------------------------
adminRoute.get('/category', getCategories);
adminRoute.post('/category', addCategory);
adminRoute.delete('/category/:id', deleteCategory);
adminRoute.patch('/category/:id', updateCategory);
//--------- sub category -----------------------------
adminRoute.get('/subcategory', getSubCategories);
adminRoute.post('/subcategory', addSubCategory);
adminRoute.delete('/subcategory/:id', deleteSubCategory);
adminRoute.patch('/subcategory/:id', updateSubCategory);
//--------- vendor -----------------------------------
// adminRoute.get('/vendor', getSubCategories);
adminRoute.get('/vendor', getVendors);
adminRoute.get('/unapprove_vendor', getUnapprovedVendors);
adminRoute.patch('/appr_vendor/:id', approveVendor);
adminRoute.patch('/assign_categ/:vendor/:cat', assignCategory);
adminRoute.patch('/assign_scateg/:vendor/:scat', assignSubCategory);

//--------- bookings -----------------------------------
adminRoute.get('/booking', getBookings);

module.exports = adminRoute;

/*
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const verified = await bcrypt.compare(password, user.password);
*/
