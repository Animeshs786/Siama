const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { Service } = require("../../../models");
const { verifyAccessToken } = require("../../../utils");
const Cart = require("../../../models/cart");

const getServiceDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const token = req.query.token;

    if (!isValidObjectId(id)) {
      throw new ApiError("Invalid service id", 400);
    }

    const service = await Service.findById(id).select(
      "-created_at -updated_at -__v"
    );

    if (!service) {
      throw new ApiError("Bad Request", 400);
    }

    let inCart = false;
    let quantity = 0;

    if (token && token != "null") {
      const decoded = verifyAccessToken(token);
      const userId = decoded.id;
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const productInCart = cart.products.find(
          (product) => product.productId.toString() === id
        );
        if (productInCart) {
          inCart = true;
          quantity = productInCart.quantity;
        }
      }
    }

    return res.status(200).json({
      status: true,
      message: "Service Details",
      data: {
        ...service.toObject(),
        inCart,
        quantity,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getServiceDetails;
