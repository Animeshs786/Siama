const Review = require("../../../models/review");
const Service = require("../../../models/service");

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const reviews = await Review.find({ service: review.service });
    const ratingNumber = reviews.length;
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const ratingAverage = ratingNumber > 0 ? ratingSum / ratingNumber : 0;

    await Service.findByIdAndUpdate(review.service, {
      ratingAverage,
      ratingNumber,
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = deleteReview;
