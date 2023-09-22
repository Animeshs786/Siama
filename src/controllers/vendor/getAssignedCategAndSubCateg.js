const { Vendor } = require('../../models');

const getAssignedCategAndSubCateg = async (req, res, next) => {
  try {
    const id = req.vendor._id;
    const vendor = await Vendor.findById(id)
      .populate([{ path: 'categories' }, { path: 'sub_categories' }])
      .select('-otp -otp_expiry -__v');
    return res.status(200).json({
      status: true,
      message: 'Assigned Categories and Sub Categories.',
      data: {
        categories: vendor.categories,
        sub_categories: vendor.sub_categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAssignedCategAndSubCateg;
