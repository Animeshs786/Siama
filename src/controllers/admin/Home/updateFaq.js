const Home = require("../../../models/home");

const updateFaq = async (req, res, next) => {
  try {
    const { faqId, question, answer } = req.body;
    const home = await Home.findById("664d9d801ab345f4917d7ba3");

    const faq = home.faq.id(faqId);
    if (faq) {
      faq.question = question;
      faq.answer = answer;
      await home.save();

      res.status(200).json({
        status: true,
        message: "Faq updated successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Faq not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateFaq;
