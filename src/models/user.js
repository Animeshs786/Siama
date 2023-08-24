const mongoose = require('mongoose');
const user = new mongoose.Schema(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    email_verified: { type: Boolean, default: false },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date, default: Date.now },
    address: { type: String, default: '' },
    profile_image: { type: String, default: '' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'users',
  }
);

const User = mongoose.model('User', user);
module.exports = User;
