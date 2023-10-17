const { isValidObjectId } = require('mongoose');
const { Service } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getServices = async (req, res, next) => {
  try {
    const { categs, scategs, search, service_mode } = req.query;
    const findObj = {};
    let categ_arr = [];
    if (categs) {
      categ_arr = categs.split(',');
      for (let i = 0; i < categ_arr.length; i++) {
        const id = categ_arr[i];
        if (!isValidObjectId(id)) throw new ApiError('Invalid Category Id', 400);
      }
      findObj.category = { $in: categ_arr };
    }

    let scateg_arr = [];
    if (scategs) {
      scateg_arr = scategs.split(',');
      for (let i = 0; i < scateg_arr.length; i++) {
        const id = scateg_arr[i];
        if (!isValidObjectId(id)) throw new ApiError('Invalid sub category id', 400);
      }
      findObj.sub_category = { $in: scateg_arr };
    }

    if (search) findObj.name = { $regex: search, $options: 'i' };

    if (service_mode) {
      const modes = ['online', 'onsite', 'both'];
      if (!modes.includes(service_mode)) throw new ApiError('Invalid Service mode', 400);
      let findModes = [];
      if (service_mode === 'online') findModes = ['online', 'both'];
      if (service_mode === 'onsite') findModes = ['onsite', 'both'];
      if (service_mode === 'both') findModes = ['both'];
      findObj.service_mode = { $in: findModes };
    }

    const services = await Service.find(findObj);
    return res.status(200).json({
      status: true,
      message: 'Service listing.',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getServices;

/*
try {
  const { categs, mode } = req.query;
  let cat_arr = [];
  if (categs) cat_arr = categs.split(',');
  for (let i = 0; i < cat_arr.length; i++) {
    const id = cat_arr[i];
    if (!isValidObjectId(id)) throw new ApiError('Invalid Category Id', 400);
  }
  const result = await Category.find({
    _id: { $in: cat_arr },
  });
  return res.status(200).json({
    status: true,
    message: 'Service listing.',
    data: result,
  });
}
*/
/*
Category.aggregate([
  {
    $match: {
      _id: { $in: categoryIds },
    },
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'subcategories',
      foreignField: '_id',
      as: 'subcategories',
    },
  },
  {
    $lookup: {
      from: 'services',
      localField: 'services',
      foreignField: '_id',
      as: 'services',
    },
  },
])
  .exec((err, categories) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(categories);
  });


     // const services = await Category.find({
    //   _id: { $or: cat_arr },
    // }).populate([{ path: 'services' }]);
*/
