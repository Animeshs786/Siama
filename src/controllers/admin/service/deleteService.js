const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service } = require('../../../models');

const deleteService = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid service id', 400);
    await Service.findByIdAndDelete(id);
    return res.status(200).json({ status: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteService;

