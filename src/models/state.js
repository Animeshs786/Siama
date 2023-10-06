const mongoose = require('mongoose');

const state = new mongoose.Schema(
  {
    name: { type: String },
    state_code: { type: String, unique: true },
    value: { type: String, unique: true },
  },
  {
    timestamps: false,
    collection: 'states',
  }
);
const State = mongoose.model('State', state);
module.exports = State;
