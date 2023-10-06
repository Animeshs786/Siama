const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const confirmBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid booking id', 400);
    const booking = await Booking.findById(id);
    if (!booking) throw new ApiError('Invalid booking id', 400);
    if (booking.booking_status === 'booked') {
      booking.booking_status = 'confirm';
      await booking.save();
    }
    return res.status(200).json({ status: true, message: 'Booking Confirmed' });
  } catch (error) {
    next(error);
  }
};

module.exports = confirmBooking;
