const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Coupon } = require('../../../models');

const updateCoupon = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { code, offer_amount, amount_type, title, description, expiry, status } = req.body;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const coupon = await Coupon.findById(id);

    if (code) coupon.code = code;
    if (offer_amount) {
      if (isNaN(offer_amount)) throw new ApiError('Invalid amount', 400);
      coupon.offer_amount = offer_amount;
    }
    if (amount_type) {
      if (amount_type !== 'fix' && amount_type !== 'percent') throw new ApiError('Invalid amount type', 400);
      coupon.amount_type = amount_type;
    }
    if (description) coupon.description = description;
    if (title) coupon.title = title;
    if (expiry) {
      if (isNaN(new Date(expiry).getTime())) throw new ApiError('Invalid expiry', 400);
      coupon.expiry = expiry;
    }
    if (status !== undefined) coupon.status = status;

    await coupon.save();
    return res.status(201).json({ status: true, message: 'Coupon updated', data: { coupon } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCoupon;
