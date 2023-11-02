const { ApiError } = require('../../../errorHandler');
const { getOtp } = require('../../../utils');
const { Admin } = require('../../../models');

const getAdminOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new ApiError('Email is required.', 400);
    const admin = await Admin.findOne({ email });
    if (!admin) throw new ApiError('Invalid credentials.', 400);

    admin.otp = getOtp();
    admin.otp_expiry = new Date(Date.now() + 2 * 60 * 1000);
    await admin.save();

    return res.status(200).json({
      status: true,
      message: 'OTP send to registered number.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAdminOtp;
