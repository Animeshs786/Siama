const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { ApiError } = require('../../../errorHandler');
const bcrypt = require('bcrypt');
const { Admin } = require('../../../models');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/admin')) {
      fs.mkdirSync('public/admin', { recursive: true });
    }
    cb(null, 'public/admin');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `admin-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('profile_image');

const updateAdminProfile = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
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
        await deleteOldFile(admin.profile_image);
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
