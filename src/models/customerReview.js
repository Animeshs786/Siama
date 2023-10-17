const mongoose = require('mongoose');

const customerReview = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    rating: { type: Number, default: 0 },
    review: { type: String, default: '' },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'customer_review',
  }
);

const CustomerReview = mongoose.model('CustomerReview', customerReview);
module.exports = CustomerReview;
