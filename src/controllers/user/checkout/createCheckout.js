const Razorpay = require("razorpay");
const Checkout = require("../../../models/checkout");
const { ApiError } = require("../../../errorHandler");
const Cart = require("../../../models/cart");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID_TEST,
  key_secret: process.env.RAZOR_KEY_SECRET_TEST,
});

function generateOrderId() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 9);
  return `${timestamp}-${randomNum}`;
}

const createCheckout = async (req, res, next) => {
  try {
    const {
      addressId,
      products,
      cuponCode,
      cuponDiscount,
      serviceCharge = 0,
      visitingCharge = 0,
      type = "COD",
      slot,
    } = req.body;
    console.log(req.body, "test");
    const userId = req.user._id;

    if (!addressId) {
      throw new ApiError("Address must be required.", 400);
    }

    if (!products) {
      throw new ApiError("Product must be required.", 400);
    }

    if (!slot) {
      throw new ApiError("Booking slot must be required.", 400);
    }

    let subTotal = 0;
    products.forEach((product) => {
      // subTotal += product.price * product.quantity;
      subTotal += +product.price;
    });

    const payableAmount =
      subTotal + serviceCharge + visitingCharge - (cuponDiscount || 0);

    let order = "";
    console.log(payableAmount,"payamount");
    console.log("outside", type);
    if (type === "Online") {
      console.log("inside", type, payableAmount);
      order = await razorpayInstance.orders.create({
        amount:  payableAmount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });
      console.log("after", type);
    }

    const newCheckout = new Checkout({
      user: userId,
      address: addressId,
      products: products,
      cuponCode: cuponCode,
      cuponDiscount: cuponDiscount || 0,
      orderId: type === "Online" ? order.id : generateOrderId(),
      status: type === "COD" ? "pending" : "initiated",
      subTotal: subTotal,
      serviceCharge: serviceCharge,
      visitingCharge: visitingCharge,
      payableAmount: payableAmount,
      paymentType: type,
      slot,
    });

    await newCheckout.save();

    if (type === "COD") {
      const cart = await Cart.findOneAndDelete({ userId });
    }

    res.status(200).json({
      success: true,
      data: {
        checkout: newCheckout,
      },
    });
  } catch (error) {
    console.log(error.message, "error message");
    next(error);
  }
};

module.exports = createCheckout;
