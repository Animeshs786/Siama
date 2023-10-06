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
    consult_charge: { type: String, default: '0' }, //only for onsite mode
    consult_charge_paid: { type: Boolean, default: false }, // when onsite consult charge will be pre pay
    service_charge_paid: { type: Boolean, default: false }, // offline post pay, online pre pay
    //initiated, booked,cancelled, confirm, allocated,[rescheduled] ,inprogress, hold, delivered, completed
    booking_status: { type: String, default: 'initiated' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'bookings',
  }
);

const Booking = mongoose.model('Booking', booking);
module.exports = Booking;
