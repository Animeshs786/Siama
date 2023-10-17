const multer = require('multer');
const fs = require('fs');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const { ApiError } = require('../../../errorHandler');
const { Service, Category, SubCategory } = require('../../../models');
const { isValidObjectId } = require('mongoose');

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
      if (error) throw new ApiError(error.message, 400);
      const {
        cat_id,
        scat_id,
        name,
        description,
        service_mode,
        service_charge,
        consult_charge,
        estimate_time,
        status,
      } = req.body;

      if (!name) throw new ApiError('Service name is required.', 400);
      if (!cat_id) throw new ApiError('Category id is required.', 400);
      if (!isValidObjectId(cat_id)) throw new ApiError('Category id is invalid.', 400);
      const cat = await Category.findById(cat_id);
      if (!cat) throw new ApiError('Category id is invalid.', 400);

      if (!scat_id) throw new ApiError('Sub Category id is required.', 400);
      if (!isValidObjectId(scat_id)) throw new ApiError('Sub Category id is invalid.', 400);
      const scat = await SubCategory.findById(scat_id);
      if (!scat) throw new ApiError('Sub Category id is invalid.', 400);

      if (!service_mode) throw new ApiError('service_mode is required.', 400);
      if (service_mode !== 'online' && service_mode !== 'onsite' && service_mode !== 'both')
        throw new ApiError('service_mode is invalid.', 400);
      if (!service_charge) throw new ApiError('Service charge is required.', 400);
      if (isNaN(service_charge)) throw new ApiError('Invalid service charge', 400);

      if (consult_charge) {
        if (isNaN(consult_charge)) throw new ApiError('Invalid consult charge', 400);
      }

      if (status && status !== 'true' && status !== 'false') throw new ApiError('Invalid status value', 400);
      if (!req.file) throw new ApiError('Service image is required.', 400);
      const data = {
        category: cat_id,
        sub_category: scat_id,
        name,
        description: description || '',
        service_mode,
        service_charge,
        consult_charge: consult_charge || '0',
        estimate_time: estimate_time || '',
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
