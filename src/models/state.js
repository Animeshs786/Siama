const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stateCode: {
    type: String,
    unique: true,
  },
  country: String,
  careateAt: {
    type: Date,
    default: Date.now,
  },
});

const State = mongoose.model("State", stateSchema);
module.exports = State;
