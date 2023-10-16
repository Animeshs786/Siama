const { CallbackRequest } = require('../../../models');

const getCallbackRequests = async (req, res, next) => {
  try {
    const cbrs = await CallbackRequest.find().populate([
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
      { path: 'service' },
    ]);
    return res.status(200).json({
      status: true,
      message: 'callback requests',
      data: {
        callbacks: cbrs,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCallbackRequests;
