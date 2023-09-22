const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, Category } = require('../../../models');

const assignCategory = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor;
    const cat_id = req.params.cat;
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid Vendor ID', 400);
    if (!isValidObjectId(cat_id)) throw new ApiError('Invalid Category ID', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Bad Request', 400);
    const categ = await Category.findById(cat_id);
    if (!categ) throw new ApiError('Bad Request', 400);

    vendor.categories.push(cat_id);
    await vendor.save();
    return res.status(201).json({
      status: true,
      message: 'Category is assigned.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assignCategory;
