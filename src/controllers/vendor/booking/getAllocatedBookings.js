const { Booking } = require('../../../models');

const getAllocatedBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ vendor: req.vendor._id }).populate([
      { path: 'service' },
      { path: 'address' },
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
    ]);
    return res.status(200).json({ status: true, message: 'Bookings listings.', data: { bookings } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllocatedBookings;
