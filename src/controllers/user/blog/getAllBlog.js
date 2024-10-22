const Blog = require("../../../models/blog");

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: true });
    res.status(200).json({
      status: true,
      data: {
        blogs,
      },
      message: "Blogs fetched successfully.",
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = {
  getAllBlog,
};
