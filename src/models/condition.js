const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  status: {
    type: Boolean,
    default: true,
  },
  slug: { type: String, require: true, trim: true, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
conditionSchema.index({ slug: 1 });

// conditionSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "category",
//     select: "name",
//   });
//   next();
// });

const Condition = mongoose.model("Condition", conditionSchema);

module.exports = Condition;
