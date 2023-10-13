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
city.index({ state: 1 });

const City = mongoose.model('City', city);
// City.createIndexes({ state: 1 });
module.exports = City;
