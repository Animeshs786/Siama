const UserPayment = require('./UserPayment');
const Address = require('./address');
const Admin = require('./admin');
const Banner = require('./banner');
const Booking = require('./booking');
const CallbackRequest = require('./callbackRequest');
const Category = require('./category');
const City = require('./city');
const Consult = require('./consult');
const ConsultPayment = require('./consultPayment');
const CustomerReview = require('./customerReview');
const InitUser = require('./initUser');
const Service = require('./service');
const ServiceRequest = require('./serviceRequest');
const State = require('./state');
const SubCategory = require('./subCategory');
const User = require('./user');
const Vendor = require('./vendor');
const VendorInbox = require('./vendorInbox');

module.exports = {
  InitUser,
  User,
  Category,
  SubCategory,
  Service,
  Admin,
  Vendor,
  Booking,
  UserPayment,
  Address,
  State,
  City,
  Banner,
  CallbackRequest,
  VendorInbox,
  CustomerReview,
  ServiceRequest,
  Consult,
  ConsultPayment,
};
