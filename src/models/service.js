const mongoose = require('mongoose');
const service = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: { type: String, default: '' },
    mrp: { type: String, required: true },
    selling_price: { type: String, required: true },
    consult_required: { type: Boolean, default: false },
    consult_online: { type: Boolean, default: false },
    consult_fee: { type: String, default: '0' },
    estimate_time: { type: String, default: '' },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'services',
  }
);

const Service = mongoose.model('Service', service);
module.exports = Service;
