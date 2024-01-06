const { Booking, CustomerReview, VendorInbox } = require('../../models');

const getHomeData = async (req, res, next) => {
  try {
    // const
    const vendor = req.vendor;
    const data = {
      email_verified: vendor.email_verified,
      documents: vendor.documents,
      bank_details: vendor.bank_details,
      kyc_status: vendor.kyc_status,
      insufficient_docs: vendor.documents.length > 4,
    };

    const bookings = await Booking.find({ vendor: req.vendor._id });
    data.bookings = bookings;

    const total_bookings = await Booking.countDocuments({ vendor: req.vendor._id });
    data.total_bookings = total_bookings;

    // .populate([
    //   { path: 'service' },
    //   { path: 'address' },
    //   { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
    // ]);

    const new_bookings = await Booking.find({ vendor: req.vendor._id, booking_status: 'allocated' });
    data.new_bookings = new_bookings;

    const delivered_bookings = await Booking.find({ vendor: req.vendor._id, booking_status: 'delivered' });
    data.delivered_bookings = delivered_bookings;

    const open_bookings = await Booking.find({
      vendor: req.vendor._id,
      booking_status: { $in: ['allocated', 'inprogress', 'hold'] },
    });
    data.open_bookings = open_bookings;

    const inbox = await VendorInbox.find({ vendor: req.vendor._id }).limit(10).sort('-created_at');
    data.inbox = inbox;

    const reviews = await CustomerReview.find({ vendor: req.vendor._id })
      .limit(10)
      .sort('-created_at')
      .populate('booking');
    data.reviews = reviews;

    return res.status(200).json({
      status: true,
      message: 'Vendor home',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getHomeData;
async function genPass() {
  const bcrypt = require('bcrypt');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Services@2023%#', salt);
  console.log('>', hashedPassword);
}
