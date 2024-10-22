const Checkout = require("../../../models/checkout");

const getAllCheckout = async (req, res) => {
  try {
    const userId = req.user._id;
    const checkout = await Checkout.find({
      user: userId,
      status: { $ne: "initiated" },
    }).sort("-createAt");

    const updatedCheckout = checkout.map((item) => {
      const slot = new Date(item.slot);
      const bookingDate = slot.toISOString().split("T")[0];
      const bookingTime = slot.toTimeString().split(" ")[0];

      return {
        ...item.toObject(),
        bookingDate,
        bookingTime,
      };
    });

    res.status(200).json({
      status: true,
      data: {
        checkout: updatedCheckout,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = getAllCheckout;
