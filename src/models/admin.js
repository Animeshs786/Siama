const mongoose = require('mongoose');
const admin = new mongoose.Schema(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String, default: '' },
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
