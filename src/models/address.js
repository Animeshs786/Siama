const mongoose = require('mongoose');
const address = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    state_id: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    city_id: { type: String, trim: true, default: '' },
    pincode: { type: String, trim: true, default: '' },
    building: { type: String, trim: true, default: '' },
    landmark: { type: String, trim: true, default: '' },
  },
  {
    timestamps: false,
    collection: 'addresses',
  }
);

const Address = mongoose.model('Address', address);
module.exports = Address;
