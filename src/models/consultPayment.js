const mongoose = require('mongoose');

const consult_payment = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    consult: { type: mongoose.Schema.Types.ObjectId, ref: 'Consult' },
    consult_status: { type: String, default: 'initiated' },
    consult_charge: { type: String, default: '0' },
    payment_status: { type: String, default: 'initiated' }, //initiated,pending,due,success,failed
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'consult_payments',
  }
);

const ConsultPayment = mongoose.model('ConsultPayment', consult_payment);
module.exports = ConsultPayment;
