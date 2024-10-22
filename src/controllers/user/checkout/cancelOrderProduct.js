const { ApiError } = require("../../../errorHandler");
const CancelledProduct = require("../../../models/cancelledProduct");
const Checkout = require("../../../models/checkout");
const { isValidObjectId } = require("mongoose");

const cancelOrderProduct = async (req, res, next) => {
  try {
    const { checkoutId, productIds } = req.body;

    if (!isValidObjectId(checkoutId)) {
      throw new ApiError("Invalid checkoutId", 400);
    }

    if (!Array.isArray(productIds) || productIds.length === 0) {
      throw new ApiError(
        "ProductIds array is required and cannot be empty",
        400
      );
    }

    const checkout = await Checkout.findById(checkoutId);

    if (!checkout) {
      throw new ApiError("Checkout not found", 404);
    }

    const cancelledProducts = [];

    for (const productId of productIds) {
      if (!isValidObjectId(productId)) {
        throw new ApiError("Invalid productId", 400);
      }

      const product = checkout.products.find((item) => {
        return item.productId._id.toString() === productId && !item.isCancell;
      });

      if (!product) {
        throw new ApiError(
          `Product with id ${productId} not found or already cancelled`,
          404
        );
      }

      const refundableAmount = product.price * product.quantity;

      product.isCancell = true;
      cancelledProducts.push({
        user: checkout.user,
        productId,
        checkoutId,
        quantity: product.quantity,
        price: product.price,
        refundableAmount,
      });
    }
    checkout.refundableAmount = Math.abs(
      cancelledProducts.reduce(
        (total, item) => total + item.refundableAmount,
        0
      )
    );

    await checkout.save();

    await CancelledProduct.insertMany(cancelledProducts);

    res.status(200).json({
      status: true,
      message: "Products cancelled successfully",
      data: cancelledProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cancelOrderProduct;
