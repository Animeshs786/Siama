const { Booking } = require('../../../models');

const getOpenBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      vendor: req.vendor._id,
      booking_status: { $in: ['allocated', 'inprogress', 'hold'] },
    }).populate([
      { path: 'service' },
      { path: 'address' },
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
    ]);
    return res.status(200).json({ status: true, message: 'Bookings listings.', data: { bookings } });
  } catch (error) {
    next(error);
  }
};

module.exports = getOpenBookings;