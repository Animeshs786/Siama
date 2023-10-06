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
      {
        path: 'vendor',
        select: 'name phone email state city address profile_image',
      },
    ]);
    return res.status(200).json({
      status: true,
      message: 'Booking Listing',
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBooking;
