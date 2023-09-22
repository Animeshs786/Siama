const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor } = require('../../../models');

const approveVendor = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Request', 400);
    const vendor = await Vendor.findById(id).select('-otp -otp_expiry -__v');
    if (!vendor) throw new ApiError('Bad Request', 400);
    vendor.approved = true;
    await vendor.save();
    return res.status(201).json({
      status: true,
      message: 'Vendor is approved.',
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = approveVendor;
