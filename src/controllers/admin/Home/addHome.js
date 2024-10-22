const { ApiError } = require("../../../errorHandler");
const Home = require("../../../models/home");

const home = async (req, res, next) => {
  try {
    const {
      id = "664d9d801ab345f4917d7ba3",
      bestTreatments,
      popularProducts,
      type,
    } = req.body;
    let obj = {};

    if (!type) throw new ApiError("Type is required", 400);

    if (bestTreatments) {
      if (type === "Men") {
        obj.bestTreatmentsMen = bestTreatments
          .split(",")
          .map((item) => item.trim());
      }

      if (type === "Women") {
        obj.bestTreatmentsWomen = bestTreatments
          .split(",")
          .map((item) => item.trim());
      }
    }

    if (popularProducts) {
      if (type === "Men") {
        obj.popularProductsMen = popularProducts
          .split(",")
          .map((item) => item.trim());
      }

      if (type === "Women") {
        obj.popularProductsWomen = popularProducts
          .split(",")
          .map((item) => item.trim());
      }
    }

    let home = await Home.findByIdAndUpdate(id, obj, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json({
      status: true,
      data: {
        home,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = home;

// const { ApiError } = require("../../../errorHandler");
// const Home = require("../../../models/home");

// const home = async (req, res, next) => {
//   try {
//     const { bestTreatments, popularProducts, type, id = "66585da96ad6c00333d075bc" } = req.body;
//     const obj = {};

//     if (!type) throw new ApiError("Type is required", 400);

//     if (type === "Men") {
//       if (bestTreatments) {
//         obj.bestTreatmentsMen = bestTreatments.split(",").map((serviceId) => ({
//           service: serviceId.trim(),
//         }));
//       }
//       if (popularProducts) {
//         obj.popularProductsMen = popularProducts.split(",").map((serviceId) => ({
//           service: serviceId.trim(),
//         }));
//       }
//     }

//     if (type === "Women") {
//       if (bestTreatments) {
//         obj.bestTreatmentsWomen = bestTreatments.split(",").map((serviceId) => ({
//           service: serviceId.trim(),
//         }));
//       }
//       if (popularProducts) {
//         obj.popularProductsWomen = popularProducts.split(",").map((serviceId) => ({
//           service: serviceId.trim(),
//         }));
//       }
//     }

//     // Update the document in the database
//     const updatedData = await Home.findByIdAndUpdate(id, obj, {
//       new: true,
//       upsert: true,
//       setDefaultsOnInsert: true,
//     });

//     res.status(200).json({
//       status: true,
//       data: {
//         updatedData,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = home;
