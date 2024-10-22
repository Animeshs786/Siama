const Home = require("../../../models/home");

const getAllFaq = async (req, res, next) => {
  try {
    const home = await Home.findById("664d9d801ab345f4917d7ba3")
      .select(
        "-bestTreatmentsMen -popularProductsMen -bestTreatmentsWomen -popularProductsWomen"
      )
      .select("faq"); // Optionally select only the 'faq' field if that's all you need

    res.status(200).json({
      status: true,
      data: { faq: home.faq },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllFaq;
