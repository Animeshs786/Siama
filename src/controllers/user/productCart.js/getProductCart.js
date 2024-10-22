const Cart = require("../../../models/cart");

const getProductCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate('products.productId');

    // if (!cart) {
    //   return res.status(404).json({ status: false, message: "Cart not found" });
    // }

    res.status(200).json({
      status: true,
      message: "Cart found",
      data: { cart },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = getProductCart;
