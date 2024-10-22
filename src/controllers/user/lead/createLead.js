const { ApiError } = require("../../../errorHandler");
const Lead = require("../../../models/lead");

const createLead = async (req, res, next) => {
  try {
    const { name, number, address, city, state, service } = req.body;
    if (!name) return next(new ApiError("Name is required", 400));
    if (!number) return next(new ApiError("Number is required", 400));
    if (!address) return next(new ApiError("Address is required", 400));
    if (!service) return next(new ApiError("Service is required", 400));
    if (number.toString().length !== 10)
      return next(new ApiError("Invalid number", 400));
    const lead = await Lead.create({
      name,
      number,
      address,
      city,
      state,
      service,
    });
    res.status(201).json({
      status: true,
      message: "Lead created successfully",
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createLead;
