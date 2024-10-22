const { Service } = require("../../../models");

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({});

    res.status(200).json({
      status: true,
      data: services,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllServices;