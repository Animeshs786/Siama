const multer = require('multer');
const fs = require('fs');
const { Banner } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');
const { isValidObjectId } = require('mongoose');
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

const updateBanner = async (req, res, next) => {
  upload(req, res, async (error) => {
    if (error) throw new ApiError(error.message, 400);
    try {
      const id = req.params.id;
      const { title, hyperlink, priority, status } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
      const banner = await Banner.findById(id);
      if (!banner) throw new ApiError('invalid id', 404);
      if (title) banner.title = title;

      if (hyperlink) {
        // Clean up the hyperlink string
        const cleanedHyperlink = hyperlink.replace(/^"|"$/g, "");
        banner.hyperlink = cleanedHyperlink;
      }
      if (priority) {
        if (isNaN(priority) || priority > 100) throw new ApiError('Invalid priority', 400);
        banner.priority = priority;
      }
      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        banner.status = status === 'true' ? true : false;
      }
      if (req.file) {
        deleteOldFile(banner.image);
        banner.image =`${req.file.destination}/${req.file.filename}`;
      }
      await banner.save();
      return res.status(201).json({
        status: true,
        message: 'Banner updated.',
        data: {
          banner,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(`${req.file.destination}/${req.file.filename}`);
      next(error);
    }
  });
};

module.exports = updateBanner;