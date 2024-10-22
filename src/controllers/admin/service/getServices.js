const { Service } = require("../../../models");

const getServices = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const obj = {};
    const { search } = req.query;
    if (search) {
      obj.name = { $regex: search, $options: "i" };
    }

    const toatal_item = await Service.countDocuments();
    const toatal_page = Math.ceil(toatal_item / limit);

    const services = await Service.find(obj)
      .populate([
        { path: "category", select: "name" },
        { path: "sub_category", select: "name" },
      ])
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Services listed.",
      data: {
        page,
        limit,
        toatal_item,
        toatal_page,
        services,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getServices;
