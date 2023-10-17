const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { ApiError } = require('../../../errorHandler');
const { Category } = require('../../../models');
const { isValidObjectId } = require('mongoose');
const { deleteOldFile } = require('../../../utils');

// upload setup destination, filename, field
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/category')) {
      fs.mkdirSync('public/category', { recursive: true });
    }
    cb(null, 'public/category');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `category-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('image');

const addCategory = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const { name, description, subcategories, services, status, priority } = req.body;
      const data = {};

      if (!name) throw new ApiError('Category name is required.', 400);
      const cat = await Category.findOne({ name });
      if (cat) throw new ApiError('Category already Exists', 400);
      data.name = name;

      if (description) data.description = description;
      if (subcategories) {
        const subcat_ids = subcategories?.split(',') || [];
        for (let i = 0; i < subcat_ids.length; i++) {
          const id = subcat_ids[i];
          if (!isValidObjectId(id)) throw new ApiError('Invalid subcategory id ' + id, 400);
        }
        data.sub_categories = subcat_ids;
      }
      if (services) {
        const service_ids = services?.split(',') || [];
        for (let i = 0; i < service_ids.length; i++) {
          const id = service_ids[i];
          if (!isValidObjectId(id)) throw new ApiError('Invalid Service id ' + id, 400);
        }
        data.services = service_ids;
      }
      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        data.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0) throw new ApiError('Invalid priority', 400);
        data.priority = priority;
      }
      if (!req.file) throw new ApiError('Category image is required.', 400);
      data.image = process.env.BASE_URL + req.file.path;
      const categ = new Category(data);
      await categ.save();
      return res.status(201).json({
        status: true,
        message: 'Category added.',
        data: {
          category: categ,
        },
      });
    } catch (error) {
      if (req.file) deleteOldFile(process.env.BASE_URL + req.file.path);
      next(error);
    }
  });
};
module.exports = addCategory;
