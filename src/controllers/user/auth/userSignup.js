const jwt = require('jsonwebtoken');
const { InitUser, User } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const userSignup = async (req, res, next) => {
  try {
    let { phone, otp, first_name, last_name, email, address } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);
    if (!first_name) throw new ApiError('First name is required.', 400);
    if (!last_name) throw new ApiError('Last name is required.', 400);
    if (!email) throw new ApiError('Email ID is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('.') || phone.includes('e')) throw new ApiError('Phone number must be numeric.', 400);
    otp = String(otp).trim();
    const user = await InitUser.findOne({ phone });
    if (!user) throw new ApiError('Bad Request', 400);

    if (new Date(user.otp_expiry).getTime() + 5 * 60 * 1000 < Date.now()) throw new ApiError('Session expired.', 400);
    if (user.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 400);

    const newUser = new User({
      phone,
      first_name,
      last_name,
      email,
    });
    await newUser.save();
    await InitUser.findOneAndDelete({ phone });
    const token = jwt.sign({ id: user._id, phone: user.phone }, ACCESS_TOKEN_SECRET);
    return res.status(200).json({
      status: true,
      message: 'Login successfully.',
      data: {
        phone: newUser.phone,
        token: token,
        newUser: false,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignup;
//validation on email id
