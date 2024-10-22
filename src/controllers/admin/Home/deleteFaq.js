const Home = require("../../../models/home");

const deleteFaq = async (req, res, next) => {
  try {
    const home = await Home.findById("664d9d801ab345f4917d7ba3");
    home.faq.pull(req.body.faqId);
    await home.save();

    res.status(200).json({
      status: true,
      message: "Faq delete successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFaq;
