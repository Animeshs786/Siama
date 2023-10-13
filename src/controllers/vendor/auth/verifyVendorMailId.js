const jwt = require('jsonwebtoken');
const { ApiError } = require('../../../errorHandler');
const { EMAIL_TOKEN_SECRET } = process.env;

const verifyVendorMailId = async (req, res, next) => {
  try {
    const vendor = req.vendor;
    const token = req.params.token;
    const data = verifyJwtToken(token, EMAIL_TOKEN_SECRET);
    if (data.error) throw new ApiError('Invalid Request', 403);
    if (vendor._id !== data.payload.id) throw new ApiError('Invalid Request', 403);
    if (!vendor.email_verified) {
      vendor.email_verified = true;
      await vendor.save();
    }
    //verified page will be designed from frontend and i will generate the link accordingly
    //it will go to that link and the get the token and hit this api with auth token and email token to verify
    // response true success page
    // response false failed page
    return res.status(200).json({ status: true, message: 'Email is verified' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyVendorMailId;

function verifyJwtToken(token, secret) {
  const data = {
    payload: null,
    error: null,
  };
  try {
    data.payload = jwt.verify(token, secret);
  } catch (error) {
    data.error = error;
  }
  return data;
}
