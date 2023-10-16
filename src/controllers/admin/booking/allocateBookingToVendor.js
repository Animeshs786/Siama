const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking, Vendor } = require('../../../models');

const allocateBookingToVendor = async (req, res, next) => {
  try {
    const { booking_id, vendor_id } = req.body;
    if (!booking_id) throw new ApiError('booking is required.', 400);
    if (!vendor_id) throw new ApiError('vendor is required.', 400);
    if (!isValidObjectId(booking_id)) throw new ApiError('invalid booking id', 400);
    if (!isValidObjectId(vendor_id)) throw new ApiError('invalid vendor id', 400);

    const booking = await Booking.findById(booking_id);
    if (!booking) throw new ApiError('Invalid booking id', 400);

    const vendor = await Vendor.findById(vendor_id);
    if (!vendor) throw new ApiError('Invalid Vendor id', 400);

    booking.vendor = vendor._id;
    booking.booking_status = 'allocated';
    booking.admin_status = 'allocated';
    booking.status_info = 'Admin allocated booking to the vendor.';
    await booking.save();
    return res.status(200).json({ status: true, message: 'Vendor allocated' });
  } catch (error) {
    next(error);
  }
};

module.exports = allocateBookingToVendor;
//TODO: create a inbox message for vendor about booking allocation
