const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { isValidObjectId } = require('mongoose');
const { Service, Category } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldImage } = require('../../../utils');

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

const updateCategory = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const id = req.params.id;
      const { name, description, /*subcategories, services,*/ status, priority } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
      const category = await Category.findById(id);
      if (!category) throw new ApiError('Bad Request', 400);

      if (name && name !== category.name) {
        const result = await Category.findOne({ name });
        if (result) throw new ApiError('Category name is already used.', 409);
        category.name = name;
      }
      if (description) category.description = description;

      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        category.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0) throw new ApiError('Invalid priority', 400);
        category.priority = priority;
      }
      // if (subcategories) {
      //   try {
      //     const sub_cat_ids = JSON.parse(subcategories);
      //     if (!Array.isArray(sub_cat_ids)) throw new ApiError('Invalid subcategories value');
      //     for (let i = 0; i < sub_cat_ids.length; i++) {
      //       const id = sub_cat_ids.at(i);
      //       if (!isValidObjectId(id)) throw new ApiError('Invalid subcategory id ' + id, 400);
      //     }
      //     category.sub_categories = sub_cat_ids;
      //   } catch (error) {
      //     throw new ApiError('Invalid subcategories value');
      //   }
      // }

      // if (services) {
      //   const service_ids = services?.split(',') || [];
      //   for (let i = 0; i < service_ids.length; i++) {
      //     const id = service_ids[i];
      //     if (!isValidObjectId(id)) throw new ApiError('Invalid Service id ' + id, 400);
      //   }
      //   category.services = service_ids;
      // }
      if (req.file) {
        await deleteOldImage(category.image);
        const url = process.env.BASE_URL + req.file.path;
        category.image = url;
      }
      await category.save();
      return res.status(201).json({
        status: true,
        message: 'Category updated',
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = updateCategory;
