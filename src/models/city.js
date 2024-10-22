const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const City = mongoose.model("City", citySchema);
module.exports = City;
