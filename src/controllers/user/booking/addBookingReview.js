const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { CustomerReview, Booking } = require('../../../models');

const addBookingReview = async (req, res, next) => {
  try {
    const { booking, rating, review } = req.body;
    if (!booking || !isValidObjectId(booking)) throw new ApiError('Invalid booking id', 400);
    const bookingRes = await Booking.findById(booking);
    if (!bookingRes) throw new ApiError('Invalid booking id', 400);
    if (bookingRes.booking_status !== 'delivered' && bookingRes.booking_status !== 'completed') {
      throw new ApiError('Bad Request', 400);
    }
    if (!rating || isNaN(rating) || Number(rating) > 5 || Number(rating) < 1)
      throw new ApiError('Invalid rating value', 400);
    const isReview = await CustomerReview.findOne({ user: req.user._id, booking });
    if (isReview) throw new ApiError('Alredy added', 400);
    const new_review = new CustomerReview({
      user: req.user._id,
      booking: booking,
      vendor: booking.vendor || null,
      rating,
      review: review || '',
    });
    await new_review.save();
    return res.status(200).json({ status: true, message: 'Review added' });
  } catch (error) {
    next(error);
  }
};

module.exports = addBookingReview;
