const mongoose = require('mongoose');
const { BASE_URL, DEFAULT_USER_IMG } = process.env;

const document = new mongoose.Schema({
  name: { type: String, default: '' },
  file_type: { type: String, default: '' },
  file: { type: String, default: '' },
  verified: { type: Boolean, default: false },
});

const bank_details = new mongoose.Schema({
  _id: false,
  bank_name: { type: String, default: '' },
  acc_holder_name: { type: String, default: '' },
  acc_no: { type: String, default: '' },
  ifsc: { type: String, default: '' },
  branch: { type: String, default: '' },
});

const vendor = new mongoose.Schema(
  {
    phone: { type: String, trim: true, unique: true },
    phone_verified: { type: Boolean, default: false },
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    email_verified: { type: Boolean, default: false },
    registered: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },

    company: { type: String, default: '' },
    building: { type: String, default: '' },
    street: { type: String, default: '' },
    locality: { type: String, default: '' },
    state: { type: String, default: '' },
    state_id: { type: String, default: '' },
    city: { type: String, default: '' },
    city_id: { type: String, default: '' },
    country: { type: String, default: '' },
    pincode: { type: String, default: '' },

    gst_no: { type: String, default: '' },
    pan_no: { type: String, default: '' },
    aadhar_no: { type: String, default: '' },

    profile_image: { type: String, default: `${BASE_URL}${DEFAULT_USER_IMG}` },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    wallet: { type: String, default: '0' },
    // services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // assigned by admin
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }], // assigned by admin
    documents: [document],
    bank_details: bank_details,
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
