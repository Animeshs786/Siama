const { ApiError } = require('../../../errorHandler');
const { SubCategory, Category } = require('../../../models');
const { isValidMongoId } = require('../../../utils');

const getServicesByCategory = async (req, res, next) => {
  try {
    const { cat_id, scat_id } = req.query;
    if (!cat_id && !scat_id) throw new ApiError('cat_id or scat_id is required.', 400);
    if (scat_id) {
      if (!isValidMongoId(scat_id)) throw new ApiError('Invalid scat_id', 400);
      const subcat = await SubCategory.findById(scat_id).populate({ path: 'services', select: '-created_at -updated_at -__v' });
      if (!subcat) throw new ApiError('Bad Request', 400);
      return res.status(200).json({
        status: true,
        message: 'Service Listing from sub category.',
        data: subcat.services,
      });
    }
    if (cat_id) {
      if (!isValidMongoId(cat_id)) throw new ApiError('Invalid cat_id', 400);
      const cat = await Category.findById(cat_id).populate({ path: 'services', select: '-created_at -updated_at -__v' });
      if (!cat) throw new ApiError('Bad Request', 400);
      return res.status(200).json({
        status: true,
        message: 'Service Listing from category',
        data: cat.services,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getServicesByCategory;
