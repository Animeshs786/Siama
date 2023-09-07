const getUserCart = async (req, res, next) => {
  try {
    const user = req.user;
    await user.populate({ path: 'cart.service', select: '-created_at -updated_at -__v' });
    let total = 0;
    user.cart.forEach((item) => {
      total += Number(item.service.selling_price) * item.quantity;
    });
    return res.status(200).json({ status: true, message: 'User Cart.', data: { subtotal: total, items: user.cart } });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserCart;
