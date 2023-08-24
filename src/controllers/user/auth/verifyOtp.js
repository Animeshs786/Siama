const { ApiError } = require('../../../errorHandler');
const { InitUser, User } = require('../../../models');
const jwt = require('jsonwebtoken');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const verifOtp = async (req, res, next) => {
  try {
    let { phone, otp, newUser } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('.') || phone.includes('e')) throw new ApiError('Phone number must be numeric.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);
    otp = String(otp).trim();
    if (newUser) newUser = true;
    else newUser = false;

    let user = null;
    if (newUser) user = await InitUser.findOne({ phone });
    else user = await User.findOne({ phone });
    if (!user) throw new ApiError('Bad Request', 400);

    if (new Date(user.otp_expiry).getTime() < Date.now()) throw new ApiError('OTP expired.', 400);
    if (user.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 400);

    user.otp_expiry = new Date();
    await user.save();
    if (newUser) {
      return res.status(200).json({
        status: true,
        message: 'OTP Verified, Continue to register.',
        data: {
          phone: user.phone,
          newUser: true,
        },
      });
    }
    const token = jwt.sign({ id: user._id, phone: user.phone }, ACCESS_TOKEN_SECRET);
    return res.status(200).json({
      status: true,
      message: 'Login Successfully.',
      data: {
        phone: user.phone,
        token: token,
        newUser: false,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifOtp;
