const { ApiError } = require("../../../errorHandler");
const Blog = require("../../../models/blog");

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new ApiError("Blog not found", 404);
    res.status(200).json({
      status: true,
      data: {
        blog,
      },
      message: "Blog fetched successfully.",
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = {
  getBlog,
};
