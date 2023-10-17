const { VendorInbox } = require('../../../models');

const valid_types = ['booking', 'admin'];

const getInbox = async (req, res, next) => {
  try {
    const vendor = req.vendor;
    const { type } = req.query;
    const findQ = { vendor: vendor._id };
    if (type && valid_types.includes(type)) findQ.type = type;
    const inbox = await VendorInbox.find(findQ).sort('-created_at');
    return res.status(200).json({
      status: true,
      message: 'Vendor Inbox',
      data: {
        inbox,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getInbox;
