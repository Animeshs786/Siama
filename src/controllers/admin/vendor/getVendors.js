const { isValidObjectId } = require("mongoose");
const { Vendor } = require("../../../models");
const { ApiError } = require("../../../errorHandler");
const getVendors = async (req, res, next) => {
  try {
    // const { cat_id, city_id } = req.query;
    // const findObj = {};
    // if (cat_id) {
    //   if (!isValidObjectId(cat_id)) throw new ApiError('Invalid category id', 400);
    //   findObj.categories = { $in: [cat_id] };
    // }
    // if (city_id) {
    //   if (!isValidObjectId(city_id)) throw new ApiError('Invalid city id', 400);
    //   findObj.cities = { $in: [city_id] };
    // }
    // const vendors = await Vendor.find(findObj).sort('created_at approved').select('-otp -otp_expiry -__v');
    const { services } = req.body;
    const obj = {};

    if (services) {
      obj.services = { $in: services };
    }
    const vendors = await Vendor.find(obj)
      .populate("sub_categories_male", "name")
      .populate("sub_categories_female", "name")
      .populate("cities", "name");

    return res.status(200).json({
      status: true,
      size: vendors?.length,
      data: {
        vendors,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getVendors;
