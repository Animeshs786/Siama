const { Vendor } = require('../../../models');
const getUnapprovedVendors = async (req, res, next) => {
  try {
    const vendor = await Vendor.find({ approved: false }).sort('created_at').select('-otp -otp_expiry -__v');
    return res.status(200).json({
      status: true,
      message: 'Unapproved Vendor listing.',
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getUnapprovedVendors;
