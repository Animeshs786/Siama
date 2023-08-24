const mongoose = require('mongoose');
const subCategory = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
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
