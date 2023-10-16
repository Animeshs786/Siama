const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { User, State, City, Vendor } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const editVendor = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const vendor = await Vendor.findById(id);
    if (!vendor) throw new ApiError('invalid id', 400);
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
      gst_no,
      pan_no,
      aadhar_no,
      status,
    } = req.body;

    if (phone) vendor.phone = phone;
    if (name) vendor.name = name;
    if (email) vendor.email = email;
    if (company) vendor.company = company;
    if (building) vendor.building = building;
    if (street) vendor.street = street;
    if (locality) vendor.locality = locality;

    if (state) {
      const stateRes = await State.findById(state);
      if (!stateRes) throw new ApiError('Invalid state', 400);
      vendor.state = stateRes.name;
      vendor.state_id = stateRes._id;
    }
    if (city) {
      const cityRes = await City.findById(city);
      if (!cityRes) throw new ApiError('Invalid city', 400);
      vendor.city = cityRes.name;
      vendor.city_id = cityRes._id;
    }
    if (country) vendor.country = country;
    // if (pincode) vendor.pincode = pincode;
    if (gst_no) vendor.gst_no = gst_no;
    if (pan_no) vendor.pan_no = pan_no;
    if (aadhar_no) vendor.aadhar_no = aadhar_no;
    if (status) {
      if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
      vendor.status = status === 'true' ? true : false;
    }
    await vendor.save();
    return res.status(200).json({
      status: true,
      message: 'Vendor updated.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = editVendor;
