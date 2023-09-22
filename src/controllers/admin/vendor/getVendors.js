const { Vendor } = require('../../../models');
const getVendors = async (req, res, next) => {
  try {
    const vendor = await Vendor.find({ approved: true }).sort('created_at').select('-otp -otp_expiry -__v');
    return res.status(200).json({
      status: true,
      message: 'Vendor listing.',
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getVendors;
