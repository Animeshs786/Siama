const { Vendor } = require('../../models');

const getVendorProfile = async (req, res, next) => {
  const vendor = await Vendor.findById(req.vendor._id).select('-categories -sub_categories -otp -otp_expiry -__v');
  try {
    return res.status(200).json({
      status: true,
      message: 'Vendor Profile Details.',
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getVendorProfile;
