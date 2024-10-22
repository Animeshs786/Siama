const { findById } = require("../../../models/assignVendor");
const Review = require("../../../models/review");
const Service = require("../../../models/service");

const createReview = async (req, res) => {
  try {
    const user = req.user._id;
    const { service, rating, review } = req.body;

    if (!user || !service || !rating) {
      return res.status(400).json({
        status: false,
        message: "User, service, and rating are required fields.",
      });
    }
    const serviceData = await Service.findById(service);

    if (!serviceData)
      return res
        .status(400)
        .json({ status: false, message: "Service not found." });

    let existingReview = await Review.findOne({ user, service });
    let newReview;

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.review = review;
      existingReview.createdAt = Date.now();
      await existingReview.save();
    } else {
      newReview = new Review({
        user,
        service,
        rating,
        review,
      });
      await newReview.save();
    }

    const reviews = await Review.find({ service });
    const ratingNumber = reviews.length;
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const ratingAverage = ratingNumber > 0 ? ratingSum / ratingNumber : 0;

    // await Service.findByIdAndUpdate(service, {
    //   ratingAverage,
    //   ratingNumber,
    // });

    serviceData.ratingAverage = ratingAverage;
    serviceData.ratingNumber = ratingNumber;
    await serviceData.save();

    const responseReview = existingReview ? existingReview : newReview;

    return res.status(existingReview ? 200 : 201).json({
      status: true,
      message: existingReview
        ? "Review updated successfully."
        : "Review added successfully.",
      data: responseReview,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = createReview;

// const Review = require("../../../models/review");
// const Service = require("../../../models/service");
// const Checkout = require("../../../models/checkout");

// const createReview = async (req, res) => {
//   try {
//     const user = req.user._id;
//     const { service, rating, review } = req.body;

//     if (!user || !service || !rating) {
//       return res.status(400).json({
//         status: false,
//         message: "User, service, and rating are required fields.",
//       });
//     }

//     // Verify if the user has purchased the service
//     const purchase = await Checkout.findOne({ user, service, status: "Success" });
//     if (!purchase) {
//       return res.status(403).json({
//         status: false,
//         message: "You can only review services you have purchased.",
//       });
//     }

//     let existingReview = await Review.findOne({ user, service });

//     if (existingReview) {
//       existingReview.rating = rating;
//       existingReview.review = review;
//       existingReview.createdAt = Date.now();
//       await existingReview.save();
//     } else {
//       const newReview = new Review({
//         user,
//         service,
//         rating,
//         review,
//       });
//       await newReview.save();
//     }

//     const reviews = await Review.find({ service });
//     const ratingNumber = reviews.length;
//     const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const ratingAverage = ratingNumber > 0 ? (ratingSum / ratingNumber) : 0;

//     await Service.findByIdAndUpdate(service, {
//       ratingAverage,
//       ratingNumber,
//     });

//     const responseReview = existingReview ? existingReview : newReview;

//     return res.status(existingReview ? 200 : 201).json({
//       status: true,
//       message: existingReview ? "Review updated successfully." : "Review added successfully.",
//       data: responseReview,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = createReview;
