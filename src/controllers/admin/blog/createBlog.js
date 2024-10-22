const Blog = require("../../../models/blog");
const multer = require("multer");
const fs = require("fs");
const { ApiError } = require("../../../errorHandler");

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/blogs")) {
      fs.mkdirSync("public/blogs", { recursive: true });
    }
    cb(null, "public/blogs");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `blog-${Date.now()}${fileExt}`;
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

const createBlog = async (req, res) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const { title, description, metaTag, author, slug,status,shortDescription } = req.body;
      let url;

      if (!slug) {
        throw new ApiError("Slug is required.", 400);
      }

      if (slug) {
        const result = await Blog.findOne({ slug });
        if (result) throw new ApiError("Slug is already used.", 409);
      }

      if (req.file) {
        url = `${req.file.destination}/${req.file.filename}`;
      }

      const blog = new Blog({
        title,
        description,
        metaTag: metaTag ? metaTag.split(",") : [],
        image: url,
        author,
        slug,
        status,
        shortDescription
      });
      await blog.save();

      res.status(201).json({
        status: true,
        data: {
          blog,
        },
        message: "Blog created successfully.",
      });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  });
};

module.exports = {
  createBlog,
};
