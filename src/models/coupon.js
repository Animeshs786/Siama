const mongoose = require('mongoose');

const coupon = new mongoose.Schema(
  {
    code: { type: String, required: [true, 'Coupon code is required'] },
    type: { type: String, default: 'booking', enum: ['booking', 'consult'] },
    offer_amount: { type: Number, default: 0, cast: '{VALUE} is not a number' },
    amount_type: { type: String, default: 'fix', enum: ['fix', 'percent'] },
    min_amount: { type: Number, default: 0 },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    expiry: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'coupons',
  }
);

const Coupon = mongoose.model('Coupon', coupon);
module.exports = Coupon;
// validFrom
// validTo
