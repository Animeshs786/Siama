const mongoose = require("mongoose");

const bestdealSchema = new mongoose.Schema({
  image: { type: String, default: "" },
  type: { type: String, default: "" },
  title: { type: String, default: "" },
  hyperlink: { type: String, trim: true },
  priority: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
},
{
  timestamps: {
    createdAt: "created_at",
    updateAt: "updated_at",
  },
  collection: "bestdeals",
});

const Bestdeal = mongoose.model("Bestdeal", bestdealSchema);
module.exports = Bestdeal;
