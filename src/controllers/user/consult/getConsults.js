const { Consult } = require('../../../models');

const getConsults = async (req, res, next) => {
  try {
    const consults = await Consult.find({ user: req.user._id })
      .populate([{ path: 'service' }])
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
