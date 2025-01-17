const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Banner } = require('../../../models');

const getBanner = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const banner = await Banner.findById(id);
    return res.status(200).json({
      status: true,
      message: 'Banner Details',
      data: {
        banner: banner,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBanner;
