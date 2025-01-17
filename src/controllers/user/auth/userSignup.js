const jwt = require('jsonwebtoken');
const { InitUser, User, State, City } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { isValidObjectId } = require('mongoose');
const { STATIC_OTP, ACCESS_TOKEN_SECRET } = process.env;

const userSignup = async (req, res, next) => {
  try {
    let { phone, otp, first_name, last_name, email, state, city, pincode, gst_no, address } = req.body;
    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!otp) throw new ApiError('OTP is required.', 400);
    if (!first_name) throw new ApiError('First name is required.', 400);
    if (!last_name) throw new ApiError('Last name is required.', 400);
    if (!email) throw new ApiError('Email ID is required.', 400);
    phone = String(phone).trim();
    if (isNaN(phone) || phone.includes('.') || phone.includes('e'))
      throw new ApiError('Phone number must be numeric.', 400);
    otp = String(otp).trim();
    const user = await InitUser.findOne({ phone });
    if (!user) throw new ApiError('Bad Request', 400);

    if (new Date(user.otp_expiry).getTime() + 5 * 60 * 1000 < Date.now()) throw new ApiError('Session expired.', 400);
    if (user.otp !== otp && otp !== STATIC_OTP) throw new ApiError('Incorrect OTP', 400);
    const email_dub = await User.findOne({ email });
    if (email_dub) throw new ApiError('Email already used.', 400);

    if (!state) throw new ApiError('state is required', 400);
    if (!isValidObjectId(state)) throw new ApiError('state id invalid', 400);
    const stateRes = await State.findById(state);
    if (!stateRes) throw new ApiError('state id invalid', 400);

    if (!city) throw new ApiError('city is required', 400);
    if (!isValidObjectId(city)) throw new ApiError('city id invalid', 400);
    const cityRes = await City.findById(city);
    if (!cityRes) throw new ApiError('city id invalid', 400);

    const newUser = new User({
      phone,
      first_name,
      last_name,
      email,
      state: stateRes.name,
      state_id: stateRes._id,
      city: cityRes.name,
      city_id: cityRes._id,
      pincode: pincode || '',
      address: address || '',
      gst_no: gst_no || '',
    });
    await newUser.save();
    await InitUser.findOneAndDelete({ phone });
    const token = jwt.sign({ id: newUser._id, phone: newUser.phone }, ACCESS_TOKEN_SECRET);
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
