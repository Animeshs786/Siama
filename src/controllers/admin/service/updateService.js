const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { isValidObjectId } = require('mongoose');
const { Service, Category, SubCategory } = require('../../../models');
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
      const {
        cat_id,
        scat_id,
        name,
        description,
        service_mode,
        service_charge,
        consult_charge,
        // consult_required,
        // consult_online,
        estimate_time,
        status,
      } = req.body;
      if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
      const service = await Service.findById(id);
      if (!service) throw new ApiError('Bad Request', 400);
      if (cat_id && cat_id !== service.category) {
        if (!isValidObjectId(cat_id)) throw new ApiError('Category id is invalid.', 400);
        const cat = await Category.findById(cat_id);
        if (!cat) throw new ApiError('Category id is invalid.', 400);
        service.category = cat_id;
        service.sub_category = null;
        if (scat_id) {
          if (!isValidObjectId(scat_id)) throw new ApiError('Sub Category id is invalid.', 400);
          const scat = await SubCategory.findById(scat_id, { category: cat_id });
          if (!scat) throw new ApiError('Sub Category id is invalid.', 400);
          service.sub_category = scat._id;
        }
      }

      if (name) service.name = name;
      if (description) service.description = description;
      if (service_mode) {
        if (service_mode !== 'online' && service_mode !== 'onsite') throw new ApiError('service_mode is invalid.', 400);
        service.service_mode = service_mode;
      }
      if (service_charge) {
        if (isNaN(service_charge)) throw new ApiError('Invalid service charge', 400);
        service.service_charge = service_charge;
      }

      if (consult_charge) {
        if (isNaN(consult_charge)) throw new ApiError('consult_charge is invalid', 400);
        service.consult_charge = consult_charge;
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
