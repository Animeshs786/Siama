const { Category } = require('../../../models');

const getCategories = async (req, res, next) => {
  try {
    const { sort_field = 'user_id', sort_type = 'asc', search } = req.query;
    if (sort_type !== 'asc' && sort_type !== 'desc') throw new ApiError('Invalid sort type', 400);

    const findQuery = {};
    if (search) {
      findQuery.$or = [
        { name: { $regex: `${search}`, $options: 'i' } },
        { description: { $regex: `${search}`, $options: 'i' } },
      ];
    }

    const categs = await Category.find(findQuery)
      .sort({ [sort_field]: sort_type })
      .lean();

    return res.status(200).json({
      status: true,
      message: 'Category listing',
      data: {
        categories: categs,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getCategories;
