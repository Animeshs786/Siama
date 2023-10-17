const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, City, VendorInbox } = require('../../../models');

const assigneCities = async (req, res, next) => {
  try {
    const vendor_id = req.params.vendor;
    const { cities: city_ids } = req.body;
    const city_arr = city_ids.split(',');
    for (let i = 0; i < city_arr.length; i++) {
      const city_id = city_arr[i];
      if (!isValidObjectId(city_id)) throw new ApiError(`Invalid city_id ID: ${city_id}`, 400);
      const city = await City.findById(city_id);
      if (!city) throw new ApiError(`Invalid city_id ID: ${city_id}`, 400);
    }
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid Vendor ID', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Invalid Vendor ID', 400);
    vendor.cities = [...new Set(city_arr)]; //:TODO
    await vendor.save();
    const inbox = new VendorInbox({
      vendor: vendor._id,
      type: 'admin',
      title: 'City assigned',
      text: 'Admin has assigned/updated your serving cities.',
    });
    await inbox.save();
    return res.status(200).json({
      status: true,
      message: 'Serving cities is assigned.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assigneCities;
