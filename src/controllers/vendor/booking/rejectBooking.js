const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const rejectBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status, reason } = req.body;
    if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value [true,false]', 400);
    if (status === 'false' && !reason) throw new ApiError('Please provide reason.', 400);
    if (!isValidObjectId(id)) throw new ApiError('Invalid booking id', 400);
    const booking = await Booking.findById(id);
    if (!booking) throw new ApiError('Invalid booking id', 400);
    if (booking.booking_status === 'booked') {
      booking.booking_status = status === 'true' ? 'confirmed' : 'admin_rejected';
      booking.admin_status = status === 'true' ? 'confirmed' : 'admin_rejected';
      booking.status_info = status === 'false' ? reason : '';
      await booking.save();
    }
    return res.status(200).json({ status: true, message: 'Booking Confirmed' });
  } catch (error) {
    next(error);
  }
};

module.exports = rejectBooking;
