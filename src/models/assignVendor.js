const mongoose = require("mongoose");

const assignVendor = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  checkout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Checkout",
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

assignVendor.pre(/^find/, function (next) {
  this.populate({
    path: "vendor",
    select: "name",
  }).populate({
    path: "checkout",
  });
  next();
});
const AssignVendor = mongoose.model("assignVendor", assignVendor);
module.exports = AssignVendor;
