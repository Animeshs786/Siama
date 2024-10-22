const { User } = require("../../../models");

const deleteUserProfile = async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  try {
    return res.status(200).json({
      status: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteUserProfile;
