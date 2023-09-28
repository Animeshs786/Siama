const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service, Booking, UserPayment } = require('../../../models');

const createBooking = async (req, res, next) => {
  try {
    const { service_id, location, scheduled_date } = req.body;
    const user = req.user;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Bad Request', 400);
    if (service.service_mode === 'onsite') {
      if (!location) throw new ApiError('Location is required for onsite service', 400);
    }
    if (!scheduled_date) throw new ApiError('Schedule Date is required.', 400);
    if (isNaN(new Date(scheduled_date).getTime())) throw new ApiError('Invalid Scheduled Date.', 400);
    const booking = new Booking({
      user: user._id,
      service: service._id,
      location: location || '',
      scheduled_date,
      estimate_time: service.estimate_time,
      service_mode: service.service_mode,
      service_charge: service.service_charge,
      consult_charge: service.consult_charge,
      consult_charge_paid: Boolean(service.consult_charge === '0'),
      service_charge_paid: false,
      booking_status: 'initiated',
    });
    //online => on time all payment
    //onsite => consult_charge then service_charge
    const payment = new UserPayment({
      user: user._id,
      booking: booking._id,
      booking_status: booking.booking_status,
      service_mode: booking.service_mode, //onsite service pay later
      consult_charge: booking.consult_charge,
      service_charge: booking.service_charge,
      consult_charge_paid: booking.consult_charge_paid,
      service_charge_paid: booking.service_charge_paid,
      payment_status: 'initiated',
    });
    await booking.save();
    await payment.save();
    return res.status(200).json({
      status: true,
      message: 'Booking created.',
      data: {
        booking: booking,
        // payment: payment,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBooking;
