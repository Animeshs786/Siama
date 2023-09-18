const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { isValidObjectId } = require('mongoose');
const { Category, SubCategory } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldImage } = require('../../../utils');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/subcategory')) {
      fs.mkdirSync('public/subcategory', { recursive: true });
    }
    cb(null, 'public/subcategory');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `subcategory-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('image');

const updateSubCategory = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const id = req.params.id;
      const { name, description, services, status, priority } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
      const subcateg = await SubCategory.findById(id);
      if (!subcateg) throw new ApiError('Bad Request', 400);

      if (name && name !== subcateg.name) {
        // const result = await SubCategory.find({ name });
        // if (result) throw new ApiError('Category name is already used.', 409);
        subcateg.name = name;
      }
      if (description) subcateg.description = description;

      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        subcateg.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0) throw new ApiError('Invalid priority', 400);
        subcateg.priority = priority;
      }

      if (services) {
        const service_ids = services?.split(',') || [];
        for (let i = 0; i < service_ids.length; i++) {
          const id = service_ids[i];
          if (!isValidObjectId(id)) throw new ApiError('Invalid Service id ' + id, 400);
        }
        subcateg.services = service_ids;
      }
      if (req.file) {
        await deleteOldImage(subcateg.image);
        const url = process.env.BASE_URL + req.file.path;
        subcateg.image = url;
      }
      await subcateg.save();
      return res.status(201).json({
        status: true,
        message: 'Subcategory updated',
        data: {
          subcateg,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = updateSubCategory;
