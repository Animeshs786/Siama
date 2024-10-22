const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const Checkout = require("../../../models/checkout");
const AssignVendor = require("../../../models/assignVendor");

const assignVendor = async (req, res, next) => {
  try {
    const { vendor, checkout } = req.body;

    if (!isValidObjectId(vendor))
      return next(new ApiError("Invalid vendor id", 400));

    if (!isValidObjectId(checkout))
      return next(new ApiError("Invalid checkout id", 400));

    const checkoutData = await Checkout.findByIdAndUpdate(
      checkout,
      {
        assignedVendor: vendor,
        orderStatus: "assigned",
      },
      {
        new: true,
      }
    );

    if (!checkoutData) return next(new ApiError("Checkout not found", 404));

    const assignedVendor = await AssignVendor.create({
      vendor,
      checkout,
    });

    res.status(201).json({
      status: true,
      message: "Vendor assigned to checkout successfully",
      data: assignedVendor,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = assignVendor;
