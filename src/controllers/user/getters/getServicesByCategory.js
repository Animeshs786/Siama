const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { SubCategory, Category, Service } = require("../../../models");

const getServicesByCategory = async (req, res, next) => {
  try {
    const { cat_id, scat_id } = req.query;
    if (!cat_id && !scat_id)
      throw new ApiError("cat_id or scat_id is required.", 400);
    if (scat_id) {
      if (!isValidObjectId(scat_id)) throw new ApiError("Invalid scat_id", 400);
      const services = await Service.find({
        sub_category: scat_id,
        status: ture,
      }).select("-created_at -updated_at -__v");
      return res.status(200).json({
        status: true,
        message: "Service Listing from sub category.",
        data: services,
      });
    }

    if (cat_id) {
      if (!isValidObjectId(cat_id)) throw new ApiError("Invalid cat_id", 400);
      const services = await Service.find({
        category: cat_id,
        status: true,
      }).select("-created_at -updated_at -__v");
      return res.status(200).json({
        status: true,
        message: "Service Listing from category",
        data: services,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getServicesByCategory;
/*
if (scat_id) {
  if (!isValidObjectId(scat_id)) throw new ApiError('Invalid scat_id', 400);
  const subcat = await SubCategory.findById(scat_id).populate({ path: 'services', select: '-created_at -updated_at -__v' });
  if (!subcat) throw new ApiError('Bad Request', 400);

  return res.status(200).json({
    status: true,
    message: 'Service Listing from sub category.',
    data: subcat.services,
  });
}

if (cat_id) {
  if (!isValidObjectId(cat_id)) throw new ApiError('Invalid cat_id', 400);
  const cat = await Category.findById(cat_id).populate({ path: 'services', select: '-created_at -updated_at -__v' });
  if (!cat) throw new ApiError('Bad Request', 400);
  return res.status(200).json({
    status: true,
    message: 'Service Listing from category',
    data: cat.services,
  });
}
*/
