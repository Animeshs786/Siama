const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { SubCategory } = require('../../../models');

const getSubCategories = async (req, res, next) => {
  try {
    const { cat_id } = req.query;
    const findObj = {};
    if (cat_id) {
      if (!isValidObjectId(cat_id)) throw new ApiError('Category id is invalid.', 400);
      findObj.category = cat_id;
    }

    const subcats = await SubCategory.find(findObj).populate({ path: 'category', select: 'name' });
    return res.status(200).json({
      status: true,
      message: 'Subcategory listing',
      data: {
        subcategories: subcats,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getSubCategories;
/*
  const categs = await SubCategory.find().populate({
      path: 'services',
      select: 'name',
    });
*/
