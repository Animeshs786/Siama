const mongoose = require('mongoose');

const banner = new mongoose.Schema(
  {
    image: { type: String, default: '' },
    type: { type: String, default: '' },
    title: { type: String, default: '' },
    hyperlink: { type: String, default: '' },
    priority: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'updated_at',
    },
    collection: 'banners',
  }
);

const Banner = mongoose.model('Banner', banner);
module.exports = Banner;
/**
 * ----------------- NOTES -----------------
 * priority is in descending order so 0 will be last and default
 *
 */
