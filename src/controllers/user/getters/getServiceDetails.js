const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service } = require('../../../models');

const getServiceDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(id).select('-created_at -updated_at -__v');
    if (!service) throw new ApiError('Bad Request', 400);
    return res.status(200).json({ status: true, message: 'Service Details.', data: service });
  } catch (error) {
    next(error);
  }
};
module.exports = getServiceDetails;
