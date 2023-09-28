const getUserCart = async (req, res, next) => {
  try {
    const user = req.user;
    await user.populate({ path: 'cart.service', select: '-created_at -updated_at -__v' });

    return res.status(200).json({ status: true, message: 'User Cart.', data: { items: user.cart } });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserCart;
//TODO:
// service charge can be later decide
