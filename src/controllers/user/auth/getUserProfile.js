const { User } = require("../../../models");

const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // const { otp, otp_expiry, created_at, updatedAt, __v, ...user } = req.user.toJSON();
  try {
    return res.status(200).json({
      status: true,
      message: "User Profile",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserProfile;
