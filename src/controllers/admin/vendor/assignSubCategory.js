const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, SubCategory, VendorInbox } = require('../../../models');

const assignSubCategory = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor;
    const { sub_categories: scat_ids } = req.body;
    const scat_arr = scat_ids.split(',');
    for (let i = 0; i < scat_arr.length; i++) {
      const scat_id = scat_arr[i];
      if (!isValidObjectId(scat_id)) throw new ApiError(`Invalid sub category ID: ${scat_id}`, 400);
      const scateg = await SubCategory.findById(scat_id);
      if (!scateg) throw new ApiError(`Invalid sub category ID: ${scat_id}`, 400);
    }
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid Vendor ID', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Invalid Vendor ID', 400);

    vendor.sub_categories = [...new Set(scat_arr)];
    // vendor.sub_categories = [...new Set([...vendor.categories, ...scat_arr])];
    await vendor.save();
    const inbox = new VendorInbox({
      vendor: vendor._id,
      type: 'admin',
      title: 'Sub category assigned',
      text: 'Admin has assigned/updated your serving sub categories.',
    });
    await inbox.save();
    return res.status(201).json({
      status: true,
      message: 'Sub Category is assigned.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assignSubCategory;
