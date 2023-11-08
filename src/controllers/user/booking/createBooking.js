const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service, Booking, UserPayment, Coupon, ClaimedCoupon } = require('../../../models');

const createBooking = async (req, res, next) => {
  try {
    const { service_id, address, scheduled_date, service_mode, coupon_code } = req.body;
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

    //coupon apply
    let discount = 0;
    let coupon_id = null;
    if (coupon_code) {
      const coupon = await Coupon.findOne({ code: coupon_code });
      if (!coupon) throw new ApiError('Invalid coupon code', 400);
      if (!coupon.status || coupon.expiry.getTime() < Date.now()) throw new ApiError('Coupon is expired', 400);
      if (+service.service_charge < coupon.min_amount) throw new ApiError('Amount is not enough', 400);
      //applied
      if (coupon.amount_type === 'fix') discount = coupon.offer_amount;
      else if (coupon.amount_type === 'percent') discount = +service.service_charge * coupon.offer_amount * 0.01;
      let claimedCoupon = await ClaimedCoupon.findOne({ coupon: coupon._id, user: user._id });
      if (claimedCoupon) claimedCoupon.used_count++;
      else {
        claimedCoupon = new ClaimedCoupon({ coupon: coupon._id, user: user._id });
      }
      await claimedCoupon.save();
      coupon_id = claimedCoupon._id.toString();
    }

    const booking = new Booking({
      user: user._id,
      service: service._id,
      address: address || null,
      scheduled_date,
      estimate_time: service.estimate_time,
      service_mode: service.service_mode !== 'both' ? service.service_mode : service_mode,
      service_charge: Number(service.service_charge) - discount,
      service_charge_paid: false,
      booking_status: 'initiated',
      user_status: 'initiated',
      status_info: 'User has initiated a booking request.',
      coupon: coupon_id,
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
      coupon: coupon_id,
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
