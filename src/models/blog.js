const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  metaTag: Array,
  image: String,
  author: String,
  shortDescription: String,
  slug: {
    type: String,
    // unique:true,
    trim: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
