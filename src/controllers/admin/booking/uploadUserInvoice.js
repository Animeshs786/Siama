const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking } = require('../../../models');
const { deleteOldFile } = require('../../../utils');

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/invoice')) {
      fs.mkdirSync('public/invoice', { recursive: true });
    }
    cb(null, 'public/invoice');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `invoice-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid media type', 400));
  },
}).single('invoice_image');

const uploadUserInvoice = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const { booking } = req.body;
      if (!booking) throw new ApiError('booking id is required', 400);
      if (!isValidObjectId(booking)) throw new ApiError('booking id is invalid.', 400);
      const bookingRes = await Booking.findById(booking);
      if (!req.file) throw new ApiError('invoice_image is required.', 400);

      bookingRes.user_invoice = process.env.BASE_URL + req.file.path;
      await bookingRes.save();
      return res.status(200).json({ status: true, message: 'Invoice uploaded' });
    } catch (error) {
      req.file && deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = uploadUserInvoice;
