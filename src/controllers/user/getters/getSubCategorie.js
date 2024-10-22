const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { SubCategory } = require("../../../models");
const Cart = require("../../../models/cart");
const { verifyAccessToken } = require("../../../utils");

// const getSubCategorie = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subCategorie = await SubCategory.findById(id);

//     if (!subCategorie) next(new ApiError("Invalid Subcategory.", 400));
//     res.status(200).json({
//       status: true,
//       data: {
//         subCategorie:[subCategorie],
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const getSubCategorie = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!isValidObjectId(id)) {
      throw new ApiError("Invalid Subcategory ID.", 400);
    }

    const subCategorie = await SubCategory.findById(id);

    if (!subCategorie) {
      throw new ApiError("Subcategory not found.", 404);
    }

    let userId = req.body.userId;
    let inCart = false;
    let quantity = 0;

    if (userId) {
      const token = userId;
      if (token) {
        const decoded = verifyAccessToken(token);
        userId = decoded.id;
      }
    }

    if (userId) {
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

    res.status(200).json({
      status: true,
      data: {
        subCategorie: [{
          ...subCategorie.toObject(),
          inCart,
          quantity,
        }],
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSubCategorie;

module.exports = getSubCategorie;
