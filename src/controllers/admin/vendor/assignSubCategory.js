const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, SubCategory } = require('../../../models');

const assignSubCategory = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor;
    const scat_id = req.params.scat;
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid Vendor ID', 400);
    if (!isValidObjectId(scat_id)) throw new ApiError('Invalid Sub Category ID', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Bad Request', 400);
    const scat = await SubCategory.findById(scat_id);
    if (!scat) throw new ApiError('Bad Request', 400);

    vendor.sub_categories.push(scat_id);
    await vendor.save();
    return res.status(201).json({
      status: true,
      message: 'Sub Category is assigned.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assignSubCategory;
