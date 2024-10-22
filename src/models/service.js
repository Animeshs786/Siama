const mongoose = require("mongoose");
const service = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    name: { type: String, trim: true, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    service_mode: { type: String, default: "online" }, // online,onsite,both
    service_charge: { type: String, default: "0" },
    consult_charge: { type: String, default: "0" }, //only for onsite mode
    estimate_time: { type: String, default: "" }, //in minutes
    status: { type: Boolean, default: true },
    bestTreatment: {
      type: Boolean,
      default: false,
    },
    popularProduct: {
      type: Boolean,
      default: false,
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    ratingNumber: {
      type: Number,
      default: 0,
    },
    tags: [String],
    slug: { type: String, trim: true, required: true, unique: true },
    faq: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    aboutUs: String,
    benefits: [
      {
        benefits: {
          type: String,
          trim: true,
        },
      },
    ],
    postTreatmentCare: [
      {
        tips: {
          type: String,
          trim: true,
        },
      },
    ],
    images: [String],
    //deprecated
    // mrp: { type: String, required: true }, // service ki mrp nahi hoti
    // selling_price: { type: String, required: true }, //service_charge
    // consult_fee: { type: String, default: '0' }, //consult_charge
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "services",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

service.index({ slug: 1 });

// service.pre(/^find/, function (next) {
//   this.populate({
//     path: "category",
//     select: "slug",
//   });
//   next();
// });

service.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "service",
});

const Service = mongoose.model("Service", service);
module.exports = Service;

//multiple vendor honge ek service ke
// vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
// consult_required: { type: Boolean, default: false },
// consult_online: { type: Boolean, default: false },

//payment => online => service_charge + ?consult_charge
//payment => onsite => service_charge
// in the middle to set the rule for the better time in the history
