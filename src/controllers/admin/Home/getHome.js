const Home = require("../../../models/home");

const getHome = async (req, res, next) => {
  try {
    const { type } = req.query;
    const home = await Home.find();

    let filteredData;

    if (type === "6654515f16a3fd61d1e6e101") {
      filteredData = home.map((item) => ({
        _id: item._id,
        createAt: item.createAt,
        bestTreatments: item.bestTreatmentsMen,
        popularProducts: item.popularProductsMen,
      }));
    } else if (type === "665451b416a3fd61d1e6e104") {
      filteredData = home.map((item) => ({
        _id: item._id,
        createAt: item.createAt,
        bestTreatments: item.bestTreatmentsWomen,
        popularProducts: item.popularProductsWomen,
      }));
    } else {
      filteredData = home; // If no type is specified, return all data
    }

    res.status(200).json({
      status: true,
      size: filteredData.length,
      data: {
        home: filteredData,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getHome;
