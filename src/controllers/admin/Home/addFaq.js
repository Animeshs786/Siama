const Home = require("../../../models/home");

const addFaq = async (req, res, next) => {
  try {
    const home = await Home.findById("664d9d801ab345f4917d7ba3");
    home.faq.push(req.body.faq);
    await home.save();

    res.status(200).json({
      status: true,
      message: "Faq added successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addFaq;
