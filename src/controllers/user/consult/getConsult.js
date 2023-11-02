const { isValidObjectId } = require('mongoose');
const { Consult } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const getConsult = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid Id', 400);
    const booking = await Consult.findById(id).populate([{ path: 'service' }]);
    return res.status(200).json({
      status: true,
      message: 'Consult',
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getConsult;
