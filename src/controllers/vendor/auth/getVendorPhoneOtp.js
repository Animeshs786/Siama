const { Vendor } = require('../../../models');
const { getOtp } = require('../../../utils');

const getVendorPhoneOtp = async (req, res, next) => {
  try {
    let { phone } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10) {
      throw new ApiError('Invalid phone number.', 400);
    }
    let vendor = await Vendor.findOne({ phone });
    if (!vendor) vendor = new Vendor({ phone });

    vendor.otp = getOtp();
    vendor.otp_expiry = new Date(Date.now() + 2 * 60 * 1000); //2min
    await vendor.save();
    return res.status(200).json({ status: true, message: 'Otp Send' });
  } catch (error) {
    next(error);
  }
};

module.exports = getVendorPhoneOtp;
