const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor, State, City } = require('../../../models');
const { BASE_URL, ACCESS_TOKEN_SECRET, EMAIL_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const registerVendor = async (req, res, next) => {
  try {
    let {
      phone,
      name,
      email,
      company,
      building,
      street,
      locality,
      state,
      city,
      country,
      pincode,
      gst_no,
      pan_no,
      aadhar_no,
    } = req.body;

    if (!phone) throw new ApiError('Phone number is required.', 400);
    if (!email) throw new ApiError('Email is required', 400);
    const result = await Vendor.findOne({ email });
    if (result && result.registered) throw new ApiError('Email is already registered, please login to continue.', 409);
    const vendor = await Vendor.findOne({ phone });
    if (vendor && vendor.registered) throw new ApiError('Phone is already registered, please login to continue.', 409);
    if (!vendor || !vendor.phone_verified) throw new ApiError('Phone number is not verified', 400);
    //till now vendor not registerd and phone is verified only

    if (!name) throw new ApiError('name is required', 400);
    if (!company) throw new ApiError('company is required', 400);
    if (!building) throw new ApiError('building is required', 400);
    if (!street) throw new ApiError('street is required', 400);
    if (!locality) throw new ApiError('locality is required', 400);

    if (!state) throw new ApiError('state is required', 400);
    if (!isValidObjectId(state)) throw new ApiError('state id invalid', 400);
    const stateRes = await State.findById(state);
    if (!stateRes) throw new ApiError('state id invalid', 400);

    if (!city) throw new ApiError('city is required', 400);
    if (!isValidObjectId(city)) throw new ApiError('city id invalid', 400);
    const cityRes = await City.findById(city);
    if (!cityRes) throw new ApiError('city id invalid', 400);

    if (!country) throw new ApiError('country is required', 400);
    if (!pincode) throw new ApiError('pincode is required', 400);
    if (!gst_no) throw new ApiError('gst_no is required', 400);
    if (!pan_no) throw new ApiError('pan_no is required', 400);
    if (!aadhar_no) throw new ApiError('aadhar_no is required', 400);

    // await vendor.save();
    await Vendor.findByIdAndUpdate(vendor._id, {
      name,
      email,
      company,
      building,
      street,
      locality,
      state: stateRes.name,
      state_id: stateRes._id,
      city: cityRes.name,
      city_id: cityRes._id,
      country,
      pincode,
      gst_no,
      pan_no,
      aadhar_no,
      registered: true,
    });
    const access_token = jwt.sign({ id: vendor._id, phone: vendor.phone }, ACCESS_TOKEN_SECRET);

    const email_token = jwt.sign({ id: vendor._id, phone: vendor.phone }, EMAIL_TOKEN_SECRET);
    //send email verification link to mail
    return res.status(200).json({
      status: true,
      message: 'Registered Successfully',
      data: {
        token: access_token,
        vendor: vendor,
      },
      testObj: {
        email_verification_link: `${BASE_URL}api/vendor/verify_email/${email_token}`,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = registerVendor;
