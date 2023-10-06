const { getStates, getCities } = require('../controllers/static');

const staticRoute = require('express').Router();

staticRoute.get('/get_states', getStates);
staticRoute.get('/get_cities', getCities);
module.exports = staticRoute;
