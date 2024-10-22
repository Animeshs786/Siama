const TermsPrivacyAbout = require("../../../models/termPrivacy");


const getTermsPrivacyAbout = async (req, res) => {
  try {
    const termsPrivacyAboutData = await TermsPrivacyAbout.find();
    res.status(200).json({ status: true, data: termsPrivacyAboutData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = getTermsPrivacyAbout;