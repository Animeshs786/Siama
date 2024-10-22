const AssignVendor = require("../../../models/assignVendor");

const getAssignedCheckout = async (req, res, next) => {
  const vendor  = req.vendor._id;
  const checkout = await AssignVendor.find({ vendor });
  res.status(200).json({
    status: true,
    data: {
      checkout,
    },
  });
};

module.exports = getAssignedCheckout;
