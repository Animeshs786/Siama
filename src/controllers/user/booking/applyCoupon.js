const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service, Coupon } = require('../../../models');

const applyCoupon = async (req, res, next) => {
  try {
    const user = req.user;
    const { service_id, coupon_code } = req.body;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid service id', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Invalid service id', 400);

    // const coupon = await Coupon.findById(coupon_id, { status: true, expiry: { $gt: new Date() } });
    const coupon = await Coupon.findOne({ code: coupon_code });
    if (!coupon) throw new ApiError('Invalid coupon code', 400);
    if (!coupon.status || coupon.expiry.getTime() < Date.now()) throw new ApiError('Coupon is expired', 400);
    if (+service.service_charge < coupon.min_amount) throw new ApiError('Amount is not enough', 400);
    return res.status(200).json({ status: true, message: 'Applied' });
  } catch (error) {
    next(error);
  }
};

module.exports = applyCoupon;
