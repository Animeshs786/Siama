const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { ApiError } = require('../../../errorHandler');
const { Service } = require('../../../models');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public/service')) {
      fs.mkdirSync('public/service', { recursive: true });
    }
    cb(null, 'public/service');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `service-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
  },
}).single('image');

const addService = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(err.message, 400);
      const { name, description, mrp, selling_price, consult_required, consult_online, consult_fee, estimate_time, status } =
        req.body;

      if (!name) throw new ApiError('Service name is required.', 400);

      if (!mrp) throw new ApiError('MRP is required', 400);
      if (isNaN(mrp)) throw new ApiError('MRP is invalid', 400);

      if (!selling_price) throw new ApiError('Service selling price is required.', 400);
      if (isNaN(selling_price)) throw new ApiError('Invalid selling Price', 400);

      if (!consult_required) throw new ApiError('consult_required is required', 400);
      if (consult_required !== 'true' && consult_required !== 'false') throw new ApiError('invalid consult_required', 400);

      if (!consult_online) throw new ApiError('consult_online is required', 400);

      if (consult_required === 'true') {
        if (!consult_fee) throw new ApiError('consult_fee is required', 400);
        if (isNaN(consult_fee)) throw new ApiError('consult_fee is invalid', 400);
      }
      if (status && status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
      if (!req.file) throw new ApiError('Service image is required.', 400);
      const data = {
        name,
        description,
        mrp,
        selling_price,
        consult_required,
        consult_online,
        consult_fee,
        estimate_time,
        status: status === 'true' ? true : false,
      };
      if (req.file) {
        const url = process.env.BASE_URL + req.file.path;
        data.image = url;
      }
      const service = new Service(data);
      await service.save();
      return res.status(201).json({
        status: true,
        message: 'Service added.',
        data: {
          service: service,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = addService;
