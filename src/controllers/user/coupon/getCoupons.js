const { Coupon } = require('../../../models');

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ status: true, expiry: { $gt: new Date() } });
    return res.status(200).json({ status: true, message: 'Coupons', data: { coupons } });
  } catch (error) {
    next(error);
  }
};

module.exports = getCoupons;
