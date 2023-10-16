const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const cancleBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { reason } = req.body;
    if (!String(reason).trim()) throw new ApiError('Please provide a reason.', 400);
    if (!isValidObjectId(id)) throw new ApiError('Invalid booking id', 400);
    const booking = await Booking.findById(id);
    if (!booking) throw new ApiError('Invalid booking id', 400);
    if (booking.booking_status !== 'cancelled') {
      if (!booking.booking_status === 'initiated' && !booking.booking_status === 'booked')
        throw new ApiError('Cannot Cancle Booking', 400);

      booking.booking_status = 'cancelled';
      booking.user_status = 'cancelled';
      await booking.save();
    }
    return res.status(200).json({ status: true, message: 'Booking Cancelled' });
  } catch (error) {
    next(error);
  }
};

module.exports = cancleBooking;
