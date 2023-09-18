const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Service } = require('../../../models');

const addItemToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const service_id = req.params.id;
    if (!isValidObjectId(service_id)) throw new ApiError('Invalid Service ID', 400);
    const service = await Service.findById(service_id);
    if (!service) throw new ApiError('Bad Request', 400);
    let includes = false;
    for (let i = 0; i < user.cart.length; i++) {
      const item = user.cart[i];
      if (item.service.toString() === service_id) {
        return res.status(200).json({
          status: true,
          message: 'Already Added to Cart.',
        });
        item.quantity = item.quantity + 1;
        includes = true;
        break;
      }
    }
    if (!includes) {
      //item is not in cart
      user.cart.push({
        service: service_id,
      });
    }

    await user.save();
    await user.populate({
      path: 'cart.service',
      select: '-created_at -updated_at -__v',
    });
    return res.status(200).json({
      status: true,
      message: 'Added to Cart.',
      data: {
        cart: user.cart,
      },
    });
    // await User.findByIdAndUpdate(user_id, {
    //   $push: { cart: { service: serv_id } },
    // });
  } catch (error) {
    next(error);
  }
};
module.exports = addItemToCart;
//given id should be valid
//given id should be of service, service must available
