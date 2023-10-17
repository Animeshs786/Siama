const { ServiceRequest } = require('../../../models');

const getServiceRequests = async (req, res, next) => {
  try {
    const srs = await ServiceRequest.find().populate([
      { path: 'user', select: '-otp -otp_expiry -cart -saved_address' },
      { path: 'category' },
      { path: 'subcategory' },
    ]);
    return res.status(200).json({
      status: true,
      message: 'Service requests',
      data: {
        service_requests: srs,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getServiceRequests;
