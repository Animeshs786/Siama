const { isValidObjectId } = require("mongoose");
const { Vendor } = require("../../../models");
const { ApiError } = require("../../../errorHandler");
const getVendor = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError("Invalid Vendor ID", 400);
    const vendor = await Vendor.findById(id)
      .populate([
        { path: "cities", select: "name" },
        // { path: "category", select: "name" },
      ])
      .select("-otp -otp_expiry -__v");
    if (!vendor) throw new ApiError("Bad request", 400);
    return res.status(200).json({
      status: true,
      message: "Vendor Details.",
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getVendor;
