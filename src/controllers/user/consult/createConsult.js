const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service, Consult, ConsultPayment } = require('../../../models');

const createConsult = async (req, res, next) => {
  try {
    const { service_id, scheduled_date } = req.body;
    const user = req.user;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Bad Request', 400);

    const consult = new Consult({
      user: user._id,
      service: service._id,
      consult_charge: service.consult_charge,
      scheduled_date: scheduled_date || '',
      consult_status: 'initiated',
    });

    const payment = new ConsultPayment({
      user: user._id,
      consult: consult._id,
      consult_charge: consult.consult_charge,
      consult_status: consult.consult_status,
      payment_status: 'initiated',
    });
    await consult.save();
    await payment.save();
    return res.status(200).json({
      status: true,
      message: 'Booking created.',
      data: {
        consult: consult,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createConsult;
