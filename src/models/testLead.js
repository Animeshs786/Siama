const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: Number,
  email: {
    type: String,
    required: true,
  },
  location: String,
  date: {
    type: Date,
    default: Date.now,
  },
  budget: Number,
  guest: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestLead = mongoose.model("TestTestLead", leadSchema);
module.exports = TestLead;
