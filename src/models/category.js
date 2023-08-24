const mongoose = require('mongoose');
const category = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: '' },
    sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
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
