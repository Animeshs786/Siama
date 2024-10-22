const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
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
      isCancell: { type: Boolean, default: false },
    },
  ],
  cuponCode: String,
  cuponDiscount: {
    type: Number,
    default: 0,
  },
  orderId: String,
  paymentId: String,
  status: String,
  orderStatus: {
    type: String,
    default: "pending",
  },
  assignedVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  subTotal: Number,
  serviceCharge: { type: Number, default: 0 },
  visitingCharge: { type: Number, default: 0 },
  payableAmount: Number,
  slot: Date,
  paymentType: { type: String, default: "COD" },
  refundableAmount: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
});

checkoutSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  })
    .populate({
      path: "address",
    })
    .populate({
      path: "products.productId",
    })
    .populate({
      path: "assignedVendor",
      select: "name ",
    });
  next();
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
