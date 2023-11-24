const fs = require('fs');
const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking, VendorInbox } = require('../../../models');
const { deleteOldFile } = require('../../../utils');
const multer = require('multer');

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/payslip')) {
      fs.mkdirSync('public/payslip', { recursive: true });
    }
    cb(null, 'public/payslip');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `payslip-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid media type', 400));
  },
}).single('image');

const uploadPaymentSlip = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const { booking } = req.body;
      if (!booking) throw new ApiError('booking id is required', 400);
      if (!isValidObjectId(booking)) throw new ApiError('booking id is invalid.', 400);
      const bookingRes = await Booking.findById(booking);
      if (!bookingRes) throw new ApiError('booking id is invalid.', 400);
      if (!req.file) throw new ApiError('payment slip is required.', 400);

      if (!bookingRes.vendor) throw new ApiError('No vendor found', 400);

      bookingRes.vendor_payslip = process.env.BASE_URL + req.file.path;
      await bookingRes.save();

      const inbox = new VendorInbox({
        vendor: bookingRes.vendor._id,
        type: 'admin',
        title: 'Payment slip added',
        text: `Admin has added payment slip for booking id ${bookingRes._id}`,
      });
      await inbox.save();

      return res.status(200).json({ status: true, message: ' uploaded' });
    } catch (error) {
      req.file && deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = uploadPaymentSlip;
