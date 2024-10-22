const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, Category, VendorInbox, SubCategory } = require('../../../models');

const assignCategory = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor;
    const { categories: cat_ids } = req.body;
    const cat_arr = cat_ids.split(',');
    for (let i = 0; i < cat_arr.length; i++) {
      const cat_id = cat_arr[i];
      if (!isValidObjectId(cat_id)) throw new ApiError(`Invalid category ID: ${cat_id}`, 400);
      const categ = await SubCategory.findById(cat_id);
      if (!categ) throw new ApiError(`Invalid category ID: ${cat_id}`, 400);
    }
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid Vendor ID', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Invalid Vendor ID', 400);

    vendor.categories = [...new Set(cat_arr)];
    // vendor.categories = [...new Set([...vendor.categories, ...cat_arr])];
    await vendor.save();
    const inbox = new VendorInbox({
      vendor: vendor._id,
      type: 'admin',
      title: 'Category assigned',
      text: 'Admin has assigned/updated your serving categories.',
    });
    await inbox.save();
    return res.status(201).json({
      status: true,
      message: 'Category is assigned.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assignCategory;
