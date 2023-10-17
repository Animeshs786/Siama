const { CustomerReview } = require('../../models');

const getCustomerReviews = async (req, res, next) => {
  try {
    const reviews = await CustomerReview.find({ vendor: req.vendor._id }).sort('-created_at').populate('booking');
    return res.status(200).json({
      status: true,
      message: '',
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCustomerReviews;
