const { isValidObjectId } = require('mongoose');
const { CallbackRequest, Service } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const requestCallback = async (req, res, next) => {
  try {
    const user = req.user;
    const { service_id, name, phone, address, description } = req.body;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Invalid service id', 400);
    const isAlready = await CallbackRequest.findOne({ user: user._id, service: service._id });
    if (isAlready)
      return res.status(200).json({ status: true, message: 'Callback request is sent', test: { isAlready } });

    const callbackReq = new CallbackRequest({
      user: user._id,
      service: service._id,
      name: name || '',
      phone: phone || '',
      address: address || '',
      description: description || '',
    });
    await callbackReq.save();
    return res.status(200).json({ status: true, message: 'Callback request is sent', test: { callbackReq } });
  } catch (error) {
    next(error);
  }
};

module.exports = requestCallback;
