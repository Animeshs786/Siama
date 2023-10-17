const { Booking } = require('../../../models');

const getInvoices = async (req, res, next) => {
  try {
    // const bookings = await Booking.find({ vendor: req.vendor._id })
    //   .sort('-created_at')
    //   .select('invoice_image booking_status');
    const result = await Booking.aggregate([
      { $match: { vendor: req.vendor._id } },
      { $project: { _id: 'booking_id', invoice_image: 1, booking_status: 1 } },
      { $sort: { created_at: -1 } },
    ]);

    return res.status(200).json({
      status: true,
      message: 'Invoices',
      data: {
        invoices: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getInvoices;
/*
invoices ::
{ 
  booking_id: _id,
  invoice_image: invoice_image,
  booking_status: booking_status
}
*/
