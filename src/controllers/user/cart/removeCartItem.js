const removeCartItem = async (req, res, next) => {
  try {
    const user = req.user;
    const service_id = req.params.id;
    const i = user.cart.findIndex((item) => item.service.toString() === service_id);
    if (i !== -1) {
      user.cart.splice(i, 1);
      await user.save();
    }
    await user.populate({
      path: 'cart.service',
      select: '-created_at -updated_at -__v',
    });
    return res.status(200).json({
      status: true,
      message: 'Service Removed from cart.',
      data: user.cart,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = removeCartItem;
