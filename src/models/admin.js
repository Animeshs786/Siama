const mongoose = require('mongoose');
const admin = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String, default: '' },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'admins',
  }
);

const Admin = mongoose.model('Admin', admin);
module.exports = Admin;
