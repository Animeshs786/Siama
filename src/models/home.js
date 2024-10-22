const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  title: String,
  bestTreatmentsWomen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  popularProductsWomen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  bestTreatmentsMen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  popularProductsMen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  createAt: { type: Date, default: Date.now },
});

homeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bestTreatmentsMen",
    populate: [
      // { path: "category", select: "name" },
      { path: "sub_category", select: "name slug" },
    ],
  })
    .populate({
      path: "popularProductsMen",
      populate: [
        // { path: "category", select: "name" },
        { path: "sub_category", select: "name slug" },
      ],
    })
    .populate({
      path: "bestTreatmentsWomen",
      populate: [
        // { path: "category", select: "name" },
        { path: "sub_category", select: "name slug" },
      ],
    })
    .populate({
      path: "popularProductsWomen",
      populate: [
        // { path: "category", select: "name" },
        { path: "sub_category", select: "name slug" },
      ],
    });
  next();
});

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;

// const mongoose = require("mongoose");

// const homeSchema = new mongoose.Schema({
//   title: String,
//   bestTreatmentsWomen: [
//     {
//       service: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Service",
//       },
//       status: { type: Boolean, default: true },
//       type: {
//         type: String,
//         default: "Best Treatment",
//       },
//     },
//   ],
//   popularProductsWomen: [
//     {
//       service: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Service",
//       },
//       status: { type: Boolean, default: true },
//       type: {
//         type: String,
//         default: "Popular Product",
//       },
//     },
//   ],
//   bestTreatmentsMen: [
//     {
//       service: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Service",
//       },
//       status: { type: Boolean, default: true },
//       type: {
//         type: String,
//         default: "Best Treatment",
//       },
//     },
//   ],
//   popularProductsMen: [
//     {
//       service: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Service",
//       },
//       status: { type: Boolean, default: true },
//       type: {
//         type: String,
//         default: "Popular Product",
//       },
//     },
//   ],
//   createAt: { type: Date, default: Date.now },
// });

// homeSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "bestTreatmentsMen",
//     populate: {
//       path: "service",
//       populate: {
//         path: "sub_category",
//         select: "name",
//       },
//     },
//   })
//     .populate({
//       path: "popularProductsMen",
//       populate: {
//         path: "service",
//         populate: {
//           path: "sub_category",
//           select: "name",
//         },
//       },
//     })
//     .populate({
//       path: "bestTreatmentsWomen",
//       populate: {
//         path: "service",
//         populate: {
//           path: "sub_category",
//           select: "name",
//         },
//       },
//     })
//     .populate({
//       path: "popularProductsWomen",
//       populate: {
//         path: "service",
//         populate: {
//           path: "sub_category",
//           select: "name",
//         },
//       },
//     });
//   next();
// });

// const Home = mongoose.model("Home", homeSchema);
// module.exports = Home;
