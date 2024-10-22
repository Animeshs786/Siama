const { ApiError } = require("../../../errorHandler");
const Blog = require("../../../models/blog");

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = {
  deleteBlog,
};
