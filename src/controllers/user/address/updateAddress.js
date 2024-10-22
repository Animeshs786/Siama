const { ApiError } = require("../../../errorHandler");
const { Address } = require("../../../models");
const { isValidMongoId } = require("../../../utils");

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidMongoId(id)) {
      throw new ApiError("Invalid address ID", 400);
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAddress) {
      throw new ApiError("Address not found", 404);
    }

    res.status(200).json({
      status: true,
      message: "Address updated successfully",
      data: {updatedAddress},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAddress;
