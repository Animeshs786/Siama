const mongoose = require('mongoose');
const service = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    name: { type: String, trim: true, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    service_mode: { type: String, default: 'online' }, // online,onsite,both
    service_charge: { type: String, default: '0' },
    consult_charge: { type: String, default: '0' }, //only for onsite mode
    estimate_time: { type: String, default: '' }, //in minutes
    status: { type: Boolean, default: true },
    //deprecated
    // mrp: { type: String, required: true }, // service ki mrp nahi hoti
    // selling_price: { type: String, required: true }, //service_charge
    // consult_fee: { type: String, default: '0' }, //consult_charge
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'services',
  }
);

const Service = mongoose.model('Service', service);
module.exports = Service;

//multiple vendor honge ek service ke
// vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
// consult_required: { type: Boolean, default: false },
// consult_online: { type: Boolean, default: false },

//payment => online => service_charge + ?consult_charge
//payment => onsite => service_charge
