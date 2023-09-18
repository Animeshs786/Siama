const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Category } = require('../../../models');

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Category id', 400);
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ status: true, message: 'Category deleted.' });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteCategory;
