const { userLogin, verifOtp, userSignup } = require('../controllers/user');
const { SubCategory, Category } = require('../models');

const testRoute = require('express').Router();

testRoute.get('/', async (req, res, next) => {
  try {
    // const categs = await SubCategory.find()
    //   .select('-created_at -updated_at -__v')
    //   .populate({ path: 'services', select: '-created_at -updated_at -__v' });
    const categs = await Category.find({})
      .select('-created_at -updated_at -__v')
      .populate({
        path: 'sub_categories',
        select: '-created_at -updated_at -__v',
        populate: {
          path: 'services',
          model: 'Service',
          select: '-created_at -updated_at -__v',
        },
      });

    res.status(200).json({ categs });
  } catch (err) {
    next(err);
  }
});
module.exports = testRoute;
