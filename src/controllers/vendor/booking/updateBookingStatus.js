const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const booking_status = ['vendor_rejected', 'inprogress', 'hold', 'delivered'];

const updateBookingStatus = async (req, res, next) => {
  try {
    const { booking_id, status, service_charge, reason } = req.body;
    if (!booking_id) throw new ApiError('Booking id is required', 400);
    if (!isValidObjectId(booking_id)) throw new ApiError('Booking id is invalid', 400);
    const booking = await Booking.findById(booking_id);
    if (!booking) throw new ApiError('Booking id is invalid', 400);
    if (!booking_status.includes(status)) throw new ApiError('Invalid booking Status', 400);
    if (status === 'delivered' && booking.service_mode === 'onsite') {
      if (service_charge) booking.service_charge = service_charge;
    }
    if (status === 'vendor_rejected') {
      if (!reason) throw new ApiError('Please provide a reason', 400);
      booking.vendor_status = status;
      booking.status_info = reason;
    }
    booking.booking_status = status;
    await booking.save();
    return res.status(200).json({ status: true, message: 'Booking updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBookingStatus;
