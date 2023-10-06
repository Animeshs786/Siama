const { isValidObjectId } = require('mongoose');
const { Booking } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    const booking = await Booking.findById(id).populate([
      { path: 'service' },
      { path: 'address' },
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
      { path: 'vendor', select: '-otp -otp_expiry' },
    ]);
    if (!booking) throw new ApiError('Invalid Id', 400);
    return res.status(200).json({
      status: true,
      message: 'Booking Listing.',
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBooking;
