const mongoose = require('mongoose');
const subCategory = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, trim: true, required: true },
    description: { type: String, default: '' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    priority: { type: Number, default: 0 },
    image: { type: String, default: '' },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'sub_categories',
  }
);

const SubCategory = mongoose.model('SubCategory', subCategory);
module.exports = SubCategory;
