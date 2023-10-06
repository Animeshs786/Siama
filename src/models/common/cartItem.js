const { default: mongoose } = require('mongoose');

const cartItem = new mongoose.Schema({
  _id: false,
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  quantity: { type: Number, default: 1 },
});

module.exports = cartItem;
