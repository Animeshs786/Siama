const Condition = require("../../../models/condition");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/condition")) {
      fs.mkdirSync("public/condition", { recursive: true });
    }
    cb(null, "public/condition");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `condition-${Date.now()}${fileExt}`;
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

const createCondition = async (req, res) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const { name, status, category, slug } = req.body;

      if (!slug) throw new ApiError("Category slug is required.", 400);
      const conditionSlug = await Condition.findOne({ slug });
      if (conditionSlug) throw new ApiError("Slug already exists", 400);
      let url;

      if (req.file) {
        url = `${req.file.destination}/${req.file.filename}`;
      }

      const condition = new Condition({
        name,
        image: url,
        status,
        category,
        slug,
      });
      await condition.save();

      res.status(201).json({
        status: true,
        data: {
          condition,
        },
        message: "Condition create successfully.",
      });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  });
};

module.exports = createCondition;
