const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const Bestdeal = require('../../../models/bestdeal');

const getBestdeal = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const banner = await Bestdeal.findById(id);
    return res.status(200).json({
      status: true,
      message: 'Best deal Details',
      data: {
        banner: banner,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBestdeal;
