const userRoute = require('express').Router();

userRoute.get('/', (req, res) => {
  res.status(200).json({ status: true });
});
module.exports = userRoute;
