const multer = require('multer');
const fs = require('fs');
const { Banner } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/banner')) {
      fs.mkdirSync('public/banner', { recursive: true });
    }
    cb(null, 'public/banner');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `banner-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('banner_image');

const addBanner = async (req, res, next) => {
  upload(req, res, async (error) => {
    if (error) throw new ApiError(err.message, 400);
    try {
      const { title, hyperlink, priority, status } = req.body;
      const data = {};
      if (!title) throw new ApiError('Title is required.', 400);
      data.title = title;
      if (hyperlink) data.hyperlink = hyperlink;
      if (priority) {
        if (isNaN(priority) || priority > 100) throw new ApiError('Invalid priority', 400);
        data.priority = priority;
      }
      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        data.status = status === 'true' ? true : false;
      }
      if (!req.file) throw new ApiError('Banner image is required.', 400);
      data.image = process.env.BASE_URL + req.file.path;
      const banner = new Banner(data);
      await banner.save();
      return res.status(201).json({
        status: true,
        message: 'Banner added.',
        data: {
          banner,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(process.env.BASE_URL + req.file.path);
      next(error);
    }
  });
};

module.exports = addBanner;
