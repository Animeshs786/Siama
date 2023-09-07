const { ApiError } = require('../../../errorHandler');
const { Category } = require('../../../models');
const { isValidMongoId } = require('../../../utils');

const getSubCategories = async (req, res, next) => {
  try {
    const category_id = req.query.cat_id;
    if (!category_id) throw new ApiError('Category Id is required.', 400);
    if (!isValidMongoId(category_id)) throw new ApiError('Invalid Category id', 400);
    const categ = await Category.findById(category_id).populate({
      path: 'sub_categories',
      select: '-created_at -updated_at -__v',
    });
    if (!categ) throw new ApiError('Bad Request', 400);
    return res.status(200).json({
      status: true,
      message: 'Sub Category Listing',
      data: categ.sub_categories,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getSubCategories;
