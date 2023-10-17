const mongoose = require('mongoose');

const serviceRequest = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    industry: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    requirement: { type: String, default: '' },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'service_request',
  }
);

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequest);
module.exports = ServiceRequest;

/*
email : rmsil rmso;
*/
