const Checkout = require("../../../models/checkout");

const getAllCheckout = async (req, res) => {
  try {
    const dataObj = {};
    const {
      user,
      status,
      paymentType,
      orderId,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (+page - 1) * +limit;

    const totalItem = await Checkout.countDocuments();
    const totalPage = Math.ceil(totalItem / +limit);

    if (user) {
      dataObj.user = user;
    }

    if (status) dataObj.status = status;
    if (paymentType) dataObj.paymentType = paymentType;
    if (orderId) dataObj.orderId = orderId;

    const checkout = await Checkout.find(dataObj).sort("-createAt");

    res.status(200).json({
      status: true,
      size: checkout.length,
      totalPage,
      totalItem,
      data: {
        checkout,
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
