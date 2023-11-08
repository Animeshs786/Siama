const { getStates, getCities, getAddressByPincode } = require('../controllers/static');

const staticRoute = require('express').Router();

staticRoute.get('/get_states', getStates);
staticRoute.get('/get_cities', getCities);
staticRoute.get('/get_address_by_pincode/:pincode', getAddressByPincode);
module.exports = staticRoute;
