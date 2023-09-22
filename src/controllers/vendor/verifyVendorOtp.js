const { ApiError } = require('../../errorHandler');
const { Vendor } = require('../../models');
const jwt = require('jsonwebtoken');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const verifyVendorOtp = async (req, res, next) => {
  try {
    let { phone, otp } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10)
      throw new ApiError('Invalid phone number.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);
    otp = String(otp).trim();
    const vendor = await Vendor.findOne({ phone });
    if (!vendor) throw new ApiError('Bad Request', 400);
    if (new Date(vendor.otp_expiry).getTime() < Date.now()) throw new ApiError('OTP expired.', 400);
    if (vendor.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 400);

    const token = jwt.sign({ id: vendor._id, phone: vendor.phone }, ACCESS_TOKEN_SECRET);
    if (!vendor.registered) vendor.registered = true;

    vendor.otp_expiry = new Date();
    await vendor.save();

    return res.status(200).json({
      status: true,
      message: 'Login Successfully.',
      data: {
        phone: vendor.phone,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verifyVendorOtp;
