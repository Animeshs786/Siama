const { Service } = require("../../../models");

const getServiceByCat = async (req, res, next) => {
  try {
    const { category = "665451b416a3fd61d1e6e104" } = req.body;
    const services = await Service.find({ status: true, category }).select(
      "name"
    );

    return res.status(200).json({
      status: true,
      message: "Services listed.",
      data: {
        services,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getServiceByCat;
