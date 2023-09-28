const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking, UserPayment } = require('../../../models');
const razorpay = require('./razorpay');

const initiatePayment = async (req, res, next) => {
  try {
    const user = req.user;
    const { booking_id } = req.body;
    console.log('initiate payment', req.body);
    if (!booking_id) throw new ApiError('Booking ID required', 400);
    if (!isValidObjectId(booking_id)) throw new ApiError('Invalid booking id.', 400);
    const booking = await Booking.findById(booking_id);
    if (!booking) throw new ApiError('Invalid Booking ID', 400);
    const userPayment = await UserPayment.findOne({ booking: booking_id });
    if (!userPayment) throw new ApiError('Booking not found', 400);
    // find what is paid what is due then calculate total amount when recieved webhook
    // find user payment then update data accordingly in payment booking

    // booking service mode
    // online -- consult charge(will be zero) + service charge(x)
    // onsite -- consult charge(x) will be paid only, service charge will be paid later

    // const amount = Number(booking.consult_charge) + booking.service_mode === 'online' ? Number(booking.service_charge) : 0;
    let amount = 0;
    if (!userPayment.consult_charge_paid) amount += Number(userPayment.consult_charge);

    if (userPayment.service_mode === 'online') {
      if (!userPayment.service_charge_paid) amount += Number(userPayment.service_charge);
    }

    if (userPayment.service_mode === 'onsite') {
      if (!userPayment.service_charge_paid && userPayment.booking_status === 'delivered')
        amount += Number(userPayment.service_charge);
    }

    if (!amount) throw new ApiError('No amount to pay.', 400);
    console.log('amount', amount);
    const totalAmount = (amount + amount * 0.18).toFixed(2) * 100; //added gst 18%
    console.log('amount', totalAmount);
    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: 'INR',
      receipt: booking_id,
      partial_payment: false,
    });
    console.log('ORDER', order);

    return res.status(200).json({ status: true, message: 'Payment Order Details', data: { order } });
  } catch (error) {
    console.log('catech ', error, error.stack);
    next(error);
  }
};

module.exports = initiatePayment;
/*
  // const payment = await razorpay.paymentLink.create({
    //   amount: totalAmount,
    //   currency: 'INR',
    //   accept_partial: false,
    //   description: 'sample description',
    //   customer: {
    //     name: 'abc',
    //     email: 'abc@gmail.comm',
    //     contact: '234243243',
    //   },
    //   notify: {
    //     sms: false,
    //     email: false,
    //   },
    //   reminder_enable: true,
    //   callback_url: 'http://3.108.62.109:3001/api/user/payment_callback/',
    //   callback_method: 'get',
    // });

*/
