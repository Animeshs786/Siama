const { getStates, getCities } = require('../controllers/static');

const staticRoute = require('express').Router();

staticRoute.get('/get_states', getStates);
staticRoute.get('/get_cities/:state', getCities);
module.exports = staticRoute;
