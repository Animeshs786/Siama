const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service, Booking, UserPayment } = require('../../../models');

const createBooking = async (req, res, next) => {
  try {
    const { service_id, address, scheduled_date, service_mode } = req.body;
    const user = req.user;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Bad Request', 400);

    // if (service.service_mode === 'onsite') {
    //   if (!address) throw new ApiError('Address is required for onsite service', 400);
    //   if (!isValidObjectId(address)) throw new ApiError('Invalid Address id', 400);
    // }
    if (service.service_mode === 'both') {
      if (!service_mode || (service_mode !== 'online' && service_mode !== 'onsite'))
        throw new ApiError('Invalid Service mode', 400);

      if (service_mode === 'onsite' && !address) throw new ApiError('Address is required for onsite service', 400);
      if (address && !isValidObjectId(address)) throw new ApiError('Invalid Address id', 400);
    }

    if (!scheduled_date) throw new ApiError('Schedule Date is required.', 400);
    if (isNaN(new Date(scheduled_date).getTime())) throw new ApiError('Invalid Scheduled Date.', 400);
    const booking = new Booking({
      user: user._id,
      service: service._id,
      address: address || null,
      scheduled_date,
      estimate_time: service.estimate_time,
      service_mode: service.service_mode !== 'both' ? service.service_mode : service_mode,
      service_charge: service.service_charge,
      service_charge_paid: false,
      booking_status: 'initiated',
      user_status: 'initiated',
      status_info: 'User has initiated a booking request.',
    });
    //online => on time all payment
    //onsite => consult_charge then service_charge
    const payment = new UserPayment({
      user: user._id,
      booking: booking._id,
      booking_status: booking.booking_status,
      service_mode: booking.service_mode, //onsite service pay later
      service_charge: booking.service_charge,
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
