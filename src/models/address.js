const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:String,
  email:String,
  address: {
    type: String,
    required: true,
    trim: true,
  },
  building: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  pinCode: {
    type: String,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
