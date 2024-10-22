const Home = require("../../../models/home");

const getFaq = async (req, res, next) => {
  try {
    const { faqId } = req.params;
    const home = await Home.findById("664d9d801ab345f4917d7ba3");

    if (!home) {
      return res.status(404).json({
        status: false,
        message: "Home document not found",
      });
    }

    const faq = home.faq.id(faqId);

    if (!faq) {
      return res.status(404).json({
        status: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      status: true,
      data: faq,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFaq;
