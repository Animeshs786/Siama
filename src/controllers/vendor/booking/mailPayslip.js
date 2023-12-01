const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');
const sendEmail = require('../../../utils/sendEmail');

const mailPayslip = async (req, res, next) => {
  try {
    const booking_id = req.params.booking;
    const vendor = req.vendor;
    if (!booking_id) throw new ApiError('booking_id is required.', 400);
    if (!isValidObjectId(booking_id)) throw new ApiError('booking_id is invalid.', 400);
    const booking = await Booking.findById(booking_id);
    if (!booking) throw new ApiError('booking_id is invalid.', 404);
    if (!booking.vendor_payslip) throw new ApiError('Not uploaded', 404);

    //send slip to the mail
    await sendEmail({
      to_email: vendor.email,
      type: 'vendor_get_payslip',
      slip_link: booking.vendor_payslip,
    });

    return res.status(200).json({ status: true, message: 'Send to mail' });
  } catch (error) {
    next(error);
  }
};

module.exports = mailPayslip;

//get on mail vendor payslip
//update old mail arg change
//live on server
//
