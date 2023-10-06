const { ApiError } = require('../../errorHandler');
const { Vendor } = require('../../models');
const { getOtp } = require('../../utils');
const registerVendor = async (req, res, next) => {
  try {
    let { phone, name, email, state: state_id, city: city_id, address } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('e') || phone.includes('.') || phone.length > 10) {
      throw new ApiError('Invalid phone number.', 400);
    }
    // if (!state) throw new ApiError('State is required', 400);
    // if (!city) throw new ApiError('City is required', 400);
    if (!email) throw new ApiError('Email is required', 400);
    const result = await Vendor.findOne({ email });
    if (result && result.registered) throw new ApiError('Email is already registered, please login to continue.', 409);
    let vendor = await Vendor.findOne({ phone });
    if (vendor && vendor.registered) throw new ApiError('Phone is already registered, please login to continue.', 409);
    if (!vendor) {
      vendor = new Vendor({
        phone,
        name,
        email,
        // state,
        // city,
        address,
      });
    }

    vendor.otp = getOtp();
    vendor.otp_expiry = new Date(Date.now() + 2 * 60 * 1000);

    await vendor.save();
    return res.status(200).json({ status: true, message: 'OTP send.' });
  } catch (error) {
    next(error);
  }
};
module.exports = registerVendor;
