const Razorpay = require('razorpay');
const { RAZOR_KEY_ID_LIVE, RAZOR_KEY_SECRET_LIVE } = process.env;

const razorpay = new Razorpay({
  key_id: RAZOR_KEY_ID_LIVE,
  key_secret: RAZOR_KEY_SECRET_LIVE,
});

module.exports = razorpay;

// const order = await razorpay.orders.create({
//   amount: 50000,
//   currency: 'INR',
//   receipt: 'receipt#1', //my id for reference
//   // partial_payment: false,
//   notes: {
//     key1: 'value3',
//     key2: 'value2',
//   },
// });
