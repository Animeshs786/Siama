const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const Bestdeal = require('../../../models/bestdeal');


const deleteBestdeal = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    await Bestdeal.findByIdAndDelete(id);
    return res.status(200).json({ status: true, message: 'Best deal deleted', data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBestdeal;
/*
not checked this yet
I got the reason findByIdAndRemove returns the deleted document & findByIdAndDelete does not return. If we want the deleted document then we can use findByIdAndRemove otherwise can use findByIdAndDelete.

Recommend:- If don't want to get the deleted document then have to use findByIdAndDelete because it's fast cause does not return the document.
*/
