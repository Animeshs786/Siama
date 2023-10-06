const { Booking } = require('../../../models');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate([
      { path: 'service' },
      { path: 'address' },
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
    ]);
    return res.status(200).json({
      status: true,
      message: 'Booking Listing.',
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookings;
