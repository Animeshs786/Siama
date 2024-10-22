const Checkout = require("../../../models/checkout");

const updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const checkout = await Checkout.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ status: true, checkout });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = updateCheckout;