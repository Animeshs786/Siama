const multer = require("multer");
const fs = require("fs");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const { ApiError } = require("../../../errorHandler");
const { SubCategory, Category } = require("../../../models");
const { isValidObjectId } = require("mongoose");
const { deleteOldFile } = require("../../../utils");

// upload setup destination, filename, field
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

const addSubCategory = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const {
        name,
        cat_id,
        description,
        services,
        status,
        priority,
        price,
        slug,
      } = req.body;
      const data = {};
      console.log(slug, "sdljflsdjfldsj");

      if (!name) throw new ApiError("Subcategory name is required.", 400);
      if (!slug) throw new ApiError("Slug is required.", 400);
      const catBySlug = await SubCategory.findOne({ slug });
      if (catBySlug) throw new ApiError("Slug already exists", 400);
      data.slug = slug;
      // const scat = await SubCategory.findOne({ name });
      // if (scat) throw new ApiError("Subcategory already Exists", 400);
      data.name = name;
      // if (!price) throw new ApiError("Price must be required.", 400);
      // data.price = price;
      if (!cat_id) throw new ApiError("Category id is required.", 400);
      if (!isValidObjectId(cat_id))
        throw new ApiError("Category id is invalid.", 400);
      const cat = await Category.findById(cat_id);
      if (!cat) throw new ApiError("Category id is invalid.", 400);

      data.category = cat._id;
      if (description) data.description = description;
      if (services) {
        const service_ids = services?.split(",") || [];
        for (let i = 0; i < service_ids.length; i++) {
          const id = service_ids[i];
          if (!isValidObjectId(id))
            throw new ApiError("Invalid Service id " + id, 400);
        }
        data.services = service_ids;
      }
      if (status) {
        if (status !== "true" && status !== "false")
          throw new ApiError("Invalid status value", 400);
        data.status = status;
      }
      if (priority) {
        if (isNaN(priority) || Number(priority) < 0)
          throw new ApiError("Invalid priority", 400);
        data.priority = priority;
      }
      if (!req.file) throw new ApiError("Subcategory image is required.", 400);
      data.image = `${req.file.destination}/${req.file.filename}`;
      const subcateg = new SubCategory(data);
      await subcateg.save();
      cat.sub_categories.push(subcateg._id);
      await cat.save();
      return res.status(201).json({
        status: true,
        message: "Subcategory added.",
        data: {
          subcategory: subcateg,
        },
      });
    } catch (error) {
      deleteOldFile(`${req.file.destination}/${req.file.filename}`);
      next(error);
    }
  });
};
module.exports = addSubCategory;
/*
cat.sub_categories.push(subcateg._id);
await cat.save();
*/
