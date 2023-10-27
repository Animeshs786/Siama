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

function validateGSTIN(gstin) {
  // Regular expression to match a valid GSTIN
  const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  if (!gstin.match(gstinPattern)) return false;
  // Extract state code from GSTIN
  const stateCode = gstin.substr(0, 2);
  // List of valid state codes (as of September 2021, subject to change)
  const validStateCodes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
    '83',
    '85',
    '86',
    '87',
    '88',
    '89',
    '91',
    '96',
    '97',
    '99',
  ];
  if (!validStateCodes.includes(stateCode)) return false;
  return true;
}
