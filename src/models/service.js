const mongoose = require('mongoose');
const service = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: { type: String, required: true },
    duration: { type: String, default: '' },
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
