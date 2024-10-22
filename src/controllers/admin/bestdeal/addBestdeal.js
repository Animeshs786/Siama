const multer = require("multer");
const fs = require("fs");
const { ApiError } = require("../../../errorHandler");
const { deleteOldFile } = require("../../../utils");
const Bestdeal = require("../../../models/bestdeal");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/banner")) {
      fs.mkdirSync("public/banner", { recursive: true });
    }
    cb(null, "public/banner");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
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
    allowedMimeTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError("Invalid image type", 400));
  },
}).single("banner_image");

const addBestdeal = async (req, res, next) => {
  upload(req, res, async (error) => {
    if (error) throw new ApiError(error.message, 400);
    try {
      const { title, hyperlink, priority, status } = req.body;
      const data = {};
      if (!title) throw new ApiError("Title is required.", 400);
      data.title = title;
      if (hyperlink) {
        // Clean up the hyperlink string
        const cleanedHyperlink = hyperlink.replace(/^"|"$/g, "");
        data.hyperlink = cleanedHyperlink;
      }
      if (priority) {
        if (isNaN(priority) || priority > 100)
          throw new ApiError("Invalid priority", 400);
        data.priority = priority;
      }
      if (status) {
        if (status !== "true" && status !== "false")
          throw new ApiError("Invalid status value", 400);
        data.status = status === "true" ? true : false;
      }
      if (!req.file) throw new ApiError("Banner image is required.", 400);
      data.image = `${req.file.destination}/${req.file.filename}`;
      const banner = new Bestdeal(data);
      await banner.save();
      return res.status(201).json({
        status: true,
        message: "Best deal added.",
        data: {
          banner,
        },
      });
    } catch (error) {
      if (req.file)
        deleteOldFile(`${req.file.destination}/${req.file.filename}`);
      next(error);
    }
  });
};

module.exports = addBestdeal;
