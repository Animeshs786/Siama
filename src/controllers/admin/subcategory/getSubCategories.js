const { Category, SubCategory } = require('../../../models');

const getSubCategories = async (req, res, next) => {
  try {
    const categs = await SubCategory.find().populate({
      path: 'services',
      select: 'name',
    });
    return res.status(200).json({
      status: true,
      message: 'Subcategory listing',
      data: {
        subcategories: categs,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getSubCategories;
