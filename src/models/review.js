const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be required."],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service must be required."],
  },
  rating: {
    type: Number,
    required: [true, "Rating must be required."],
    min: [1, "Rating must be greater than 1"],
    max: [5, "Rating must be less than 5"],
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
