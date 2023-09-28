const { Booking } = require('../../../models');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('created_at');
    return res.status(200).json({ status: true, message: 'Booking Listing', data: { bookings } });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookings;
