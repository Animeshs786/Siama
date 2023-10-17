const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Vendor } = require('../../../models');

const getVendorDocs = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const vendor = await Vendor.findById(id);
    if (!vendor) throw new ApiError('Invalid id', 400);
    return res.status(200).json({
      status: true,
      message: 'Vendor Documents',
      data: {
        documents: vendor.documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getVendorDocs;
