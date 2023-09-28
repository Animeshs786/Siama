const { isValidObjectId } = require('mongoose');
const { Category, Service } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getServices = async (req, res, next) => {
  try {
    const { service_mode } = req.query;
    const findObj = {};
    if (service_mode) {
      if (service_mode !== 'online' && service_mode !== 'onsite') throw new ApiError('Invalid Service mode', 400);
      findObj.service_mode = service_mode;
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
