const mongoose = require('mongoose');

const vendorInbox = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    type: { type: String, default: '' }, //booking, admin,
    title: { type: String, default: '' }, //
    text: { type: String, default: '' },
    opened: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'vendor_inbox',
  }
);

const VendorInbox = mongoose.model('VendorInbox', vendorInbox);
module.exports = VendorInbox;

// TODO: opened and delete api
