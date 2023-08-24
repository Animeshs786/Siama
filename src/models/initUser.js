const mongoose = require('mongoose');
const initUser = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String, default: '' },
    otp_expiry: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'init_users',
  }
);

const InitUser = mongoose.model('InitUser', initUser);
module.exports = InitUser;
