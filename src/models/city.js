const mongoose = require('mongoose');

const city = new mongoose.Schema(
  {
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    name: { type: String },
    value: { type: String },
  },
  {
    timestamps: false,
    collection: 'cities',
  }
);
const City = mongoose.model('City', city);
module.exports = City;
