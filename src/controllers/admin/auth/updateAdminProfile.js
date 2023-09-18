const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { ApiError } = require('../../../errorHandler');
const unlinkFile = util.promisify(fs.unlink);
const bcrypt = require('bcrypt');
const { Admin } = require('../../../models');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

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

const updateAdminProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(err.message, 400);
      const admin = req.admin;
      const { name, email, phone, password } = req.body;
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
      if (req.file) {
        await deleteOldImage(admin.profile_image);
        const url = process.env.BASE_URL + req.file.path;
        updateData.profile_image = url;
      }
      const newAdmin = await Admin.findByIdAndUpdate(admin._id, updateData, { new: true }).select(
        '-password -created_at -updatedAt -__v'
      );
      return res.status(200).json({
        status: true,
        message: 'Admin profile updated.',
        data: {
          admin: newAdmin,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = updateAdminProfile;

async function deleteOldImage(url) {
  try {
    if (url) {
      await unlinkFile(url.replace(process.env.BASE_URL, ''));
    }
  } catch (error) {
    console.log(error.message);
  }
}
