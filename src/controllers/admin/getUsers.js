const { User } = require('../../models');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-cart -otp -otp_expiry -updatedAt -__v');
    return res.status(200).json({
      status: true,
      message: 'User listing.',
      data: {
        users: users,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getUsers;
