const mongoose = require('mongoose');

const user_payment = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, //unique index later add
    booking_status: { type: String, default: 'initiated' }, //initiated, booked(payment), confirm, allocated,[rescheduled] ,inprogress, hold, delivered, completed
    service_mode: { type: String, default: 'online' }, //online|onsite, pay later
    consult_charge: { type: String, default: '0' },
    service_charge: { type: String, default: '0' },
    consult_charge_paid: { type: Boolean, default: false },
    service_charge_paid: { type: Boolean, default: false },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    payment_status: { type: String, default: 'initiated' }, //initiated,pending,due,success,failed
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'user_payments',
  }
);

const UserPayment = mongoose.model('UserPayment', user_payment);
module.exports = UserPayment;
