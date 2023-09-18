const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { SubCategory } = require('../../../models');

const deleteSubCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Category id', 400);
    await SubCategory.findByIdAndDelete(id);
    return res.status(200).json({ status: true, message: 'Category deleted.' });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteSubCategory;
