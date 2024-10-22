const mongoose = require("mongoose");
const { Schema } = mongoose;

const termsPrivacyAbout = new Schema({
  privacyPolicy: {
    type: String,
    default: "",
  },
  privacyPolicyDetails: {
    type: String,
    default: "",
  },
  termCondition: {
    type: String,
    default: "",
  },
  termConditionDetails: {
    type: String,
    default: "",
  },
  aboutUs: {
    type: String,
    default: "",
  },
  aboutUsDetails: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const TermsPrivacyAbout = mongoose.model("TermsPrivacyAbout", termsPrivacyAbout);
module.exports = TermsPrivacyAbout;