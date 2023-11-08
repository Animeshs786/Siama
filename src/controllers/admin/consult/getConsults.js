const { Consult } = require('../../../models');

const getConsults = async (req, res, next) => {
  try {
    const consults = await Consult.find({ consult_status: { $ne: 'initiated' } })
      .populate([{ path: 'service' }, { path: 'user', select: '-otp -otp_expiry -cart -saved_address' }])
      .sort('created_at');
    return res.status(200).json({
      status: true,
      message: 'Consults listing',
      data: { consults },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getConsults;
