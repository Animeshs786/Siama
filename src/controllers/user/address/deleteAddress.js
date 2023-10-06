const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { User } = require('../../../models');

const deleteAddress = async (req, res, next) => {
  try {
    const add_id = req.params.id;
    const user = await User.findById(req.user._id).populate('saved_address');

    if (!add_id || !isValidObjectId(add_id)) throw new ApiError('Invalid address id', 400);
    const i = user.saved_address.findIndex((add) => add._id === add_id);
    if (i !== -1) {
      user.saved_address.splice(i, 1);
      await user.save();
    }
    return res.status(200).json({ status: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAddress;
