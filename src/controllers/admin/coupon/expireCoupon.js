const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Coupon } = require('../../../models');

const expireCoupon = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('invalid id', 400);
    const coupon = await Coupon.findById(id);
    if (coupon) {
      coupon.expiry = new Date();
      await coupon.save();
    }
    // const del = await Coupon.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: 'Coupon expired',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = expireCoupon;
