const jwt = require('jsonwebtoken');
const { BASE_URL, EMAIL_TOKEN_SECRET } = process.env;

const getVerifyEmailLink = async (req, res, next) => {
  try {
    const vendor = req.vendor;
    const email_token = jwt.sign({ id: vendor._id, phone: vendor.phone }, EMAIL_TOKEN_SECRET);
    //send link to mail
    return res.status(200).json({
      status: true,
      message: 'Email verification link is send to your email',
      testObj: {
        email_verification_link: `${BASE_URL}api/vendor/verify_email/${email_token}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getVerifyEmailLink;
