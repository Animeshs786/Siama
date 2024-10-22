const mongoose = require("mongoose");

const cancelledProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  checkoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Checkout",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  refundableAmount: {
    type: Number,
    required: true,
  },
  cancelledAt: {
    type: Date,
    default: Date.now,
  },
});

const CancelledProduct = mongoose.model("CancelledProduct", cancelledProductSchema);

module.exports = CancelledProduct;
