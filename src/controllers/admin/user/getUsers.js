const { ApiError } = require('../../../errorHandler');
const { User } = require('../../../models');

const getUsers = async (req, res, next) => {
  try {
    const { sort_field = 'user_id', sort_type = 'asc', search } = req.query;
    if (sort_type !== 'asc' && sort_type !== 'desc') throw new ApiError('Invalid sort type', 400);

    const findQuery = {};
    if (search) {
      findQuery.$or = [
        { first_name: { $regex: `${search}`, $options: 'i' } },
        { last_name: { $regex: `${search}`, $options: 'i' } },
        { phone: { $regex: `${search}`, $options: 'i' } },
        { email: { $regex: `${search}`, $options: 'i' } },
      ];
    }

    const users = await User.find(findQuery)
      .select('-cart -otp -otp_expiry -updatedAt -__v')
      .sort({ [sort_field]: sort_type })
      .lean();

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
