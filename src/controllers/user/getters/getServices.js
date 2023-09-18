const { isValidObjectId } = require('mongoose');
const { Category } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getServices = async (req, res, next) => {
  try {
    const { categs } = req.query;
    let cat_arr = [];
    if (categs) cat_arr = categs.split(',');
    console.log(cat_arr);
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
  } catch (error) {
    next(error);
  }
};
module.exports = getServices;

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
