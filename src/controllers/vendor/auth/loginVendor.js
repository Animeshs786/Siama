const { ApiError } = require('../../../errorHandler');
const { Vendor } = require('../../../models');
const { getOtp, sendOtpToPhone } = require('../../../utils');

const loginVendor = async (req, res, next) => {
  try {
    let { phone } = req.body;
    if (!phone) throw new ApiError('Phone number in required.', 400);
    const vendor = await Vendor.findOne({ phone });
    if (!vendor) throw new ApiError('Invalid Phone number', 400);
    vendor.otp = getOtp();
    vendor.otp_expiry = new Date(Date.now() + 2 * 60 * 1000);
    //send otp to phone
    await sendOtpToPhone(phone, vendor.otp);
    //send otp to phone
    await vendor.save();
    return res.status(200).json({
      status: true,
      message: 'OTP has been sent',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = loginVendor;
