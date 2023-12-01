const multer = require('multer');
const fs = require('fs');
const { ApiError } = require('../../../errorHandler');
const { User, State, City } = require('../../../models');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const { DEFAULT_USER_IMG } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/user')) {
      fs.mkdirSync('public/user', { recursive: true });
    }
    cb(null, 'public/user');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `user-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('profile_image');

const updateUserProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      // const admin = req.admin;
      const user = req.user;
      let { first_name, last_name, state, city, pincode, gst_no, address } = req.body;
      const updateData = {};
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;
      if (state) {
        const stateRes = await State.findById(state);
        updateData.state = stateRes.name;
        updateData.state_id = stateRes._id;
      }
      if (city) {
        const cityRes = await City.findById(city);
        updateData.city = cityRes.name;
        updateData.city_id = cityRes._id;
      }
      if (pincode) updateData.pincode = pincode;
      if (gst_no) updateData.gst_no = gst_no;
      if (address) updateData.address = address;
      if (req.file) {
        if (user.profile_image !== DEFAULT_USER_IMG) await deleteOldFile(user.profile_image);
        const url = process.env.BASE_URL + req.file.path;
        updateData.profile_image = url;
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true }).select(
        '-otp -otp_expiry -created_at -updatedAt -__v'
      );
      return res.status(200).json({
        status: true,
        message: 'User profile updated.',
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(process.env.BASE_URL + req.file.path);
      next(error);
    }
  });
};

module.exports = updateUserProfile;
