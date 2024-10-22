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

const updateCondition = async (req, res) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);

      const { id } = req.params;
      const { name, status, category, slug } = req.body;

      const condition = await Condition.findById(id);
      if (!condition) {
        throw new ApiError("Condition not found", 404);
      }

      if (slug && slug !== condition.slug) {
        const result = await Condition.findOne({ slug });
        if (result) throw new ApiError("Slug is already used.", 409);
        condition.slug = slug;
      }

      if (req.file) {
        // Remove old image if exists
        if (condition.image && fs.existsSync(condition.image)) {
          fs.unlinkSync(condition.image);
        }
        condition.image = `${req.file.destination}/${req.file.filename}`;
      }

      if (name) condition.name = name;
      if (status) condition.status = status;
      if (category) condition.category = category;

      await condition.save();

      res.status(200).json({
        status: true,
        data: {
          condition,
        },
        message: "Condition update successfully.",
      });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  });
};

module.exports = updateCondition;
