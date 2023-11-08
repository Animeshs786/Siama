const mongoose = require('mongoose');

const claimedCoupon = new mongoose.Schema(
  {
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    used_count: { type: Number, default: 1 },
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: false },
    collection: 'claimedCoupons',
  }
);

const ClaimedCoupon = mongoose.model('ClaimedCoupon', claimedCoupon);
module.exports = ClaimedCoupon;
