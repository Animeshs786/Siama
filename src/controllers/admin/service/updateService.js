const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { isValidObjectId } = require('mongoose');
const { Service } = require('../../../models');
const { ApiError } = require('../../../errorHandler');
const { deleteOldImage } = require('../../../utils');

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

const updateService = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const id = req.params.id;
      const { name, description, mrp, selling_price, consult_required, consult_online, consult_fee, estimate_time, status } =
        req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
      const service = await Service.findById(id);
      if (!service) throw new ApiError('Bad Request', 400);
      if (name) service.name = name;
      if (description) service.description = description;
      if (mrp) {
        if (isNaN(mrp)) throw new ApiError('MRP is invalid', 400);
        service.mrp = mrp;
      }
      if (selling_price) {
        if (isNaN(selling_price)) throw new ApiError('Invalid selling Price', 400);
        service.selling_price = selling_price;
      }

      if (consult_required) {
        if (consult_required !== 'true' && consult_required !== 'false') throw new ApiError('invalid consult_required', 400);
        service.consult_required = consult_required === 'true' ? true : false;
      }
      if (consult_online) {
        if (consult_online !== 'true' && consult_online !== 'false') throw new ApiError('invalid consult_online', 400);
        service.consult_online = consult_online === 'true' ? true : false;
      }
      if (consult_fee) {
        if (isNaN(consult_fee)) throw new ApiError('consult_fee is invalid', 400);
        service.consult_fee = consult_fee;
      }
      if (estimate_time) service.estimate_time = estimate_time;
      if (status) {
        if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
        service.status = status;
      }
      if (req.file) {
        await deleteOldImage(service.image);
        const url = process.env.BASE_URL + req.file.path;
        service.image = url;
      }
      await service.save();
      return res.status(201).json({
        status: true,
        message: 'Service updated',
        data: {
          service,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = updateService;
