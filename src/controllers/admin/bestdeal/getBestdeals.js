const Bestdeal = require("../../../models/bestdeal");

const getBestdeals = async (req, res, next) => {
  try {
    const banners = await Bestdeal.find();
    return res.status(200).json({
      status: true,
      message: "Best deal list",
      data: {
        banners,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBestdeals;
