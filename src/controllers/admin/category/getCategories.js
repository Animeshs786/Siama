const { Category } = require('../../../models');

const getCategories = async (req, res, next) => {
  try {
    const categs = await Category.find().populate([
      {
        path: 'services',
        select: 'name',
      },
      {
        path: 'sub_categories',
        select: 'name',
      },
    ]);
    return res.status(200).json({
      status: true,
      message: 'Category listing',
      data: {
        categories: categs,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getCategories;
