const mongoose = require('mongoose');
const category = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: '' },
    image: { type: String, default: '' },
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    priority: { type: Number, default: 0 }, //zero is lowest priority
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'categories',
  }
);

const Category = mongoose.model('Category', category);
module.exports = Category;
