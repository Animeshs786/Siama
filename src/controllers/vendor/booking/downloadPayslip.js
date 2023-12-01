const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');

const downloadPayslip = async (req, res, next) => {
  try {
    const booking_id = req.params.booking;
    if (!booking_id) throw new ApiError('booking_id is required.', 400);
    if (!isValidObjectId(booking_id)) throw new ApiError('booking_id is invalid.', 400);
    const booking = await Booking.findById(booking_id);
    if (!booking) throw new ApiError('booking_id is invalid.', 404);
    if (!booking.vendor_payslip) throw new ApiError('Not uploaded', 404);

    return res.download(booking.vendor_payslip.replace(process.env.BASE_URL, ''));
  } catch (error) {
    next(error);
  }
};

module.exports = downloadPayslip;
