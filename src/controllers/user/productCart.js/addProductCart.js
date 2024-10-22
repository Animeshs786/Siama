const { isValidObjectId } = require("mongoose");
const Cart = require("../../../models/cart");
const SubCategory = require("../../../models/subCategory");
const Service = require("../../../models/service");

const addProductCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    if (!productId || !isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid product ID" });
    }

    const product = await Service.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }

    let cart = await Cart.findOne({ userId });
    product.service_charge=+product.service_charge

    if (cart) {
      // Check if product already exists in the cart
      const productIndex = cart.products.findIndex((p) =>
        p.productId.equals(productId)
      );

      if (productIndex > -1) {
        if (quantity <= 0) {
          // Remove product from cart if quantity is 0
          cart.products.splice(productIndex, 1);
        } else {
          // Product exists in the cart, update the quantity and price
          cart.products[productIndex].quantity = quantity;
          cart.products[productIndex].price =
            Number(product.service_charge) *
            cart.products[productIndex].quantity;
        }
      } else {
        if (quantity > 0) {
          // Product does not exist in cart, add new item
          cart.products.push({
            productId,
            quantity,
            price: +product.service_charge * quantity,
          });
        }
      }

      cart.subTotal = cart.products.reduce((acc, item) => acc + item.price, 0);
    } else {
      if (quantity > 0) {
        // No cart for user, create a new cart
        cart = new Cart({
          userId,
          products: [
            {
              productId,
              quantity,
              price: Number(product.service_charge) * quantity,
            },
          ],
          subTotal: Number(product.service_charge) * quantity,
        });
      }
    }

    if (cart) {
      cart.payableAmount =
        cart.subTotal + cart.serviceCharge + cart.visitingCharge;

      await cart.save();
    }

    res.status(200).json({ status: true, data: { cart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = addProductCart;
