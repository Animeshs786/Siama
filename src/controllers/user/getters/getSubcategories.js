const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { SubCategory } = require('../../../models');

const getSubCategories = async (req, res, next) => {
  try {
    const category_id = req.query.cat_id;
    if (!category_id) throw new ApiError('Category Id is required.', 400);
    if (!isValidObjectId(category_id)) throw new ApiError('Invalid Category id', 400);
    const subcat = await SubCategory.find({ category: category_id });
    return res.status(200).json({
      status: true,
      message: 'Sub Category Listing',
      data: subcat,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getSubCategories;
// const categ = await Category.findById(category_id).populate({
//   path: 'sub_categories',
//   select: '-created_at -updated_at -__v',
// });
// if (!categ) throw new ApiError('Bad Request', 400);
