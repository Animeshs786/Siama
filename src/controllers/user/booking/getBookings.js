const { Booking } = require('../../../models');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate([
        { path: 'service' },
        { path: 'address' },
        {
          path: 'vendor',
          select: 'name phone email state city address profile_image',
          // select: '-email -email_verified -approved -registered -otp -otp_expiry -status -wallet -categories -sub_categories',
        },
      ])
      .sort('created_at');
    return res.status(200).json({ status: true, message: 'Booking Listing', data: { bookings } });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookings;
