const { ApiError } = require('../../../errorHandler');
const { Coupon } = require('../../../models');

const addCoupon = async (req, res, next) => {
  try {
    const { code, offer_amount, amount_type, title, description, expiry } = req.body;
    if (!code) throw new ApiError('Coupon code is required', 400);
    if (!offer_amount) throw new ApiError('Amount is required', 400);
    if (isNaN(offer_amount)) throw new ApiError('Invalid amount', 400);
    if (!amount_type) throw new ApiError('Amount type is required', 400);
    if (amount_type !== 'fix' && amount_type !== 'percent') throw new ApiError('Invalid amount type', 400);
    if (!expiry) throw new ApiError('Expiry is required', 400);
    if (isNaN(new Date(expiry).getTime())) throw new ApiError('Invalid expiry', 400);
    const coupon = new Coupon({
      code,
      offer_amount,
      amount_type,
      expiry,
      title: title || '',
      description: description || '',
    });
    await coupon.save();
    return res.status(201).json({ status: true, message: 'Coupon added', data: { coupon } });
  } catch (error) {
    next(error);
  }
};

module.exports = addCoupon;
//code is already used,
