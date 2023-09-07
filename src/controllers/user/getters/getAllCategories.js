const { Category } = require('../../../models');

const getAllCategories = async (req, res, next) => {
  try {
    const categs = await Category.find().select('-__v');
    return res.status(200).json({
      status: true,
      message: 'Categories Listing',
      data: categs,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllCategories;