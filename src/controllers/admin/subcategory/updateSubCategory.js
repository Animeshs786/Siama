const multer = require("multer");
const fs = require("fs");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const { isValidObjectId } = require("mongoose");
const { Category, SubCategory } = require("../../../models");
const { ApiError } = require("../../../errorHandler");
const { deleteOldFile } = require("../../../utils");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/subcategory")) {
      fs.mkdirSync("public/subcategory", { recursive: true });
    }
    cb(null, "public/subcategory");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
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
    allowedMimeTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError("Invalid image type", 400));
  },
}).single("image");

const updateSubCategory = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const id = req.params.id;
      const {
        name,
        cat_id,
        description,
        /* services,*/ status,
        priority,
        price,
        slug
      } = req.body;
      if (!isValidObjectId(id)) throw new ApiError("Invalid id", 400);
      const subcateg = await SubCategory.findById(id);
      if (!subcateg) throw new ApiError("Invalid subcategory id.", 400);

      if (slug && slug !== subcateg.slug) {
        const result = await SubCategory.findOne({ slug });
        if (result) throw new ApiError("Slug is already used.", 409);
        subcateg.slug = slug;
      }

      if (name) subcateg.name = name;
      if (price) subcateg.price = price;
      if (description) subcateg.description = description;

      if (cat_id) {
        if (!isValidObjectId(cat_id))
          throw new ApiError("Category id is invalid.", 400);
        const cat = await Category.findById(cat_id);
        if (!cat) throw new ApiError("Category id is invalid.", 400);
        subcateg.category = cat._id;
        await Category.findByIdAndUpdate(
          cat_id,
          { $addToSet: { sub_categories: id } },
          { new: true, useFindAndModify: false }
        );
      }

      if (status) {
        if (status !== "true" && status !== "false")
          throw new ApiError("Invalid status value", 400);
        subcateg.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0)
          throw new ApiError("Invalid priority", 400);
        subcateg.priority = priority;
      }

      // if (services) {
      //   const service_ids = services?.split(',') || [];
      //   for (let i = 0; i < service_ids.length; i++) {
      //     const id = service_ids[i];
      //     if (!isValidObjectId(id)) throw new ApiError('Invalid Service id ' + id, 400);
      //   }
      //   subcateg.services = service_ids;
      // }
      if (req.file) {
        await deleteOldFile(subcateg.image);
        const url = `${req.file.destination}/${req.file.filename}`;
        subcateg.image = url;
      }
      await subcateg.save();
      return res.status(201).json({
        status: true,
        message: "Subcategory updated",
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
/*
const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { isValidObjectId } = require('mongoose');
const { Category, SubCategory } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');

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
      const { name, cat_id, description,  status, priority } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
      const subcateg = await SubCategory.findById(id);
      if (!subcateg) throw new ApiError('Bad Request', 400);

      if (name) subcateg.name = name;
      if (description) subcateg.description = description;

      if (cat_id && cat_id !== subcateg.category) {
        if (!isValidObjectId(cat_id)) throw new ApiError('Category id is invalid.', 400);
        const cat = await Category.findById(cat_id);
        if (!cat) throw new ApiError('Category id is invalid.', 400);
        const prevCat = await Category.findById(subcateg.category);
        if (prevCat) {
          //remove this subcategory from this prev category and add to current category
          const i = prevCat.sub_categories.findIndex((sub) => sub === subcateg._id);
          if (i !== -1) {
            prevCat.sub_categories.splice(i, 1);
            await prevCat.save();
          }
        }
        cat.sub_categories.push(subcateg._id);
        await cat.save();
        subcateg.category = cat._id;
      }

      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        subcateg.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0) throw new ApiError('Invalid priority', 400);
        subcateg.priority = priority;
      }

    
      if (req.file) {
        await deleteOldFile(subcateg.image);
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

*/
