const { Banner } = require('../../../models');

const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({ status: true }).sort('-priority');
    return res.status(200).json({
      status: true,
      message: 'Banners listing.',
      data: {
        banners,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBanners;
