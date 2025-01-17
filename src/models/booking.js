const mongoose = require('mongoose');

const booking = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    scheduled_date: { type: String, default: '' }, //YYYY-MM-DD
    estimate_time: { type: String, default: '' },
    service_mode: { type: String, default: 'online' }, //online,onsite
    service_charge: { type: String, default: '0' },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    // consult_charge: { type: String, default: '0' }, //only for onsite mode
    // consult_charge_paid: { type: Boolean, default: false }, // when onsite consult charge will be pre pay
    service_charge_paid: { type: Boolean, default: false }, // offline post pay, online pre pay
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    invoice_image: { type: String, default: '' },
    user_invoice: { type: String, default: '' },
    // [rescheduled], booked (on first payment of onsite), completed(final payment of onsite, or marked by admin delivered)
    booking_status: { type: String, default: 'initiated' },
    user_status: { type: String, default: 'initiated' }, //initiated, booked, cancelled, completed
    admin_status: { type: String, default: '' }, // admin_rejected, confirmed, allocated,
    vendor_status: { type: String, default: '' }, //vendor_rejected, inprogress, hold, delivered
    status_info: { type: String, default: '' },

    vendor_payslip: { type: String, default: '' },
    // vendor_pay_slip_status: { type: String, default: 'not_uploaded', enum: ['not_uploaded', 'uploaded'] },
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'bookings',
  }
);

const Booking = mongoose.model('Booking', booking);
module.exports = Booking;
