const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Booking, UserPayment, Consult, ConsultPayment } = require('../../../models');
const razorpay = require('./razorpay');

const initiateConsultPayment = async (req, res, next) => {
  try {
    const user = req.user;
    const { consult_id } = req.body;
    console.log('initiate consult payment', req.body);
    if (!consult_id) throw new ApiError('Booking ID required', 400);
    if (!isValidObjectId(consult_id)) throw new ApiError('Invalid booking id.', 400);
    const consult = await Consult.findById(consult_id);
    if (!consult) throw new ApiError('Invalid Booking ID', 400);
    const consultPayment = await ConsultPayment.findOne({ consult: consult._id });
    if (!consultPayment) throw new ApiError('Booking not found', 400);

    let amount = Number(consultPayment.consult_charge);
    if (!amount || isNaN(amount)) throw new ApiError(`No amount to pay. [test: ${amount}]`, 400);
    console.log('amount', amount);
    const totalAmount = (amount + amount * 0.18).toFixed(2) * 100; //added gst 18%
    console.log('amount', totalAmount);
    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: 'INR',
      receipt: `consult-${consult._id}`,
      partial_payment: false,
    });
    console.log('ORDER', order);

    return res.status(200).json({ status: true, message: 'Consult payment order details', data: { order } });
  } catch (error) {
    console.log('catch ', error, error.stack);
    next(error);
  }
};

module.exports = initiateConsultPayment;
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
