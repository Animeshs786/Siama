const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: Number,
    },
  ],
  subTotal: Number,
  serviceCharge: { type: Number, default: 0 },
  visitingCharge: { type: Number, default: 0 },
  payableAmount: Number,
  createAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
