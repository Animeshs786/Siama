const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const getUserBookings = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (!user_id) throw new ApiError('user id is required', 400);
    if (!isValidObjectId(user_id)) throw new ApiError('Invalid user id', 400);
    const bookings = await Booking.find({ user: user_id }).populate([
      { path: 'service' },
      { path: 'address' },
      // { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
      { path: 'vendor', select: '-otp -otp_expiry' },
    ]);
    return res.status(200).json({
      status: true,
      message: 'User booking list',
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserBookings;
