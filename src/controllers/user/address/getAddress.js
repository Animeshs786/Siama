const { User } = require('../../../models');

const getAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('saved_address');
    return res.status(200).json({
      status: true,
      message: 'User addess',
      data: {
        address: user.saved_address,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAddress;
