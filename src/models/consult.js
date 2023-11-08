const mongoose = require('mongoose');

const consult = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    consult_charge: { type: String, default: '0' },

    invoice_image: { type: String, default: '' },
    user_invoice: { type: String, default: '' },
    consult_status: { type: String, default: 'initiated' }, //initiated, paid, completed
  },
  {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'consults',
  }
);

const Consult = mongoose.model('Consult', consult);
module.exports = Consult;
