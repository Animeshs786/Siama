const AssignVendor = require("../../../models/assignVendor");
const Checkout = require("../../../models/checkout");

const updateCheckoutStatus = async (req, res, next) => {
  try {
    const vendor = req.vendor._id;
    const { checkout, status } = req.body;

    const data = await AssignVendor.findOne({ vendor, checkout });
    if (!data) {
      return res.status(400).json({ status: false, message: "No vendor found" });
    }
    
    data.status = status;
    await data.save();

    const checkoutData = await Checkout.findOne({ assignedVendor: vendor, _id: checkout });
    if (checkoutData) {
      checkoutData.orderStatus = status;
      await checkoutData.save();
    }

    res.status(200).json({ status: true, message: "Status updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = updateCheckoutStatus;
