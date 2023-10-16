const multer = require('multer');
const fs = require('fs');
const { ApiError } = require('../../../errorHandler');
const { User, State, City } = require('../../../models');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/vendor')) {
      fs.mkdirSync('public/vendor', { recursive: true });
    }
    cb(null, 'public/vendor');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `vendor-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('profile_image');

const updateVendorProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(err.message, 400);
      const vendor = req.vendor;
      if (!vendor) throw new ApiError('invalid id', 400);
      let {
        name,
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
        status,
      } = req.body;

      if (name) vendor.name = name;
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
      if (pincode) vendor.pincode = pincode;
      if (gst_no) vendor.gst_no = gst_no;
      if (pan_no) vendor.pan_no = pan_no;
      if (aadhar_no) vendor.aadhar_no = aadhar_no;
      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        vendor.status = status === 'true' ? true : false;
      }
      if (req.file) {
        await deleteOldFile(vendor.profile_image);
        const url = process.env.BASE_URL + req.file.path;
        vendor.profile_image = url;
      }
      await vendor.save();
      return res.status(200).json({
        status: true,
        message: 'Vendor updated.',
      });
    } catch (error) {
      if (req.file) deleteOldFile(process.env.BASE_URL + req.file.path);
      next(error);
    }
  });
};

module.exports = updateVendorProfile;
