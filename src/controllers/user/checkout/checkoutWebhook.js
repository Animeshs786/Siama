const crypto = require("crypto");
const Checkout = require("../../../models/checkout");
const Cart = require("../../../models/cart");

const checkoutWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  try {
    const bodyString = JSON.stringify(req.body);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(bodyString);
    const digest = shasum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      const event = req.body;

      if (event.event === "payment.captured") {
        const order = await Checkout.findOneAndUpdate(
          { orderId: event.payload.payment.entity.order_id },
          { status: "success", paymentId: event.payload.payment.entity.id },
          { new: true }
        );

        await Cart.findOneAndDelete({ userId: order.user });
      } else if (event.event === "payment.failed") {
        await Checkout.findOneAndUpdate(
          { orderId: event.payload.payment.entity.order_id },
          { status: "failed", paymentId: event.payload.payment.entity.id },
          { new: true }
        );
      }

      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ status: "invalid signature" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = checkoutWebhook;