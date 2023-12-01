const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor } = require('../../../models');

const verifyVendorKYC = async (req, res, next) => {
  try {
    const vendor_id = req.params.id;
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid id', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Invalid vendor id', 400);
    if (vendor.kyc_status !== 'verified') {
      vendor.kyc_status = 'verified';
      await vendor.save();
    }
    return res.status(200).json({ status: true, message: 'Vendor is KYC verified' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyVendorKYC;
