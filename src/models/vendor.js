const mongoose = require('mongoose');
const { BASE_URL, DEFAULT_USER_IMG } = process.env;

const vendor = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true },
    email_verified: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    registered: { type: Boolean, default: false },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    profile_image: { type: String, default: `${BASE_URL}${DEFAULT_USER_IMG}` },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    wallet: { type: String, default: '0' },
    // services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // assigned by admin
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }], // assigned by admin
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'vendors',
  }
);

const Vendor = mongoose.model('Vendor', vendor);
module.exports = Vendor;
