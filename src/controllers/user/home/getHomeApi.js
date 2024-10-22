const { Banner, SubCategory } = require("../../../models");
const Bestdeal = require("../../../models/bestdeal");
const Condition = require("../../../models/condition");
const Home = require("../../../models/home");

exports.homeApi = async (req, res, next) => {
  const { category_id } = req.query;
  try {
    const [banners, subCategory, home, bodyCondition, bestdeal] =
      await Promise.all([
        Banner.find({ status: true }).sort("-priority"),
        SubCategory.find({
          category: { $in: [category_id] },
          status: true,
        }).select("name image slug"),
        Home.find(),
        Condition.find({ status: true, category: category_id }).select(
          "name image slug"
        ),
        Bestdeal.find({ status: true }).sort("-priority"),
      ]);

    let filteredData;

    if (category_id === "6654515f16a3fd61d1e6e101") {
      filteredData = home.map((item) => ({
        _id: item._id,
        createAt: item.createAt,
        bestTreatments: item.bestTreatmentsMen,
        popularProducts: item.popularProductsMen,
      }));
    } else if (category_id === "665451b416a3fd61d1e6e104") {
      filteredData = home.map((item) => ({
        _id: item._id,
        createAt: item.createAt,
        bestTreatments: item.bestTreatmentsWomen,
        popularProducts: item.popularProductsWomen,
      }));
    }
    filteredData = filteredData[0];
    const { bestTreatments, popularProducts } = filteredData;

    res.status(200).json({
      status: true,
      message: "Data fetched successfully.",
      data: {
        banner: banners,
        subCategory: subCategory,
        bestTreatments,
        popularProducts,
        bodyCondition,
        bestdeal,
      },
    });
  } catch (error) {
    next(error);
  }
};
