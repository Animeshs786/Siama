const { isValidObjectId } = require('mongoose');
const { VendorInbox, Vendor } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const sendVendorMessage = async (req, res, next) => {
  try {
    const { vendor_id, msg } = req.body;
    if (!isValidObjectId(vendor_id)) throw new ApiError('Invalid id', 400);
    const vendor = await Vendor.findById(vendor_id);
    if (!msg) throw new ApiError('msg required', 400);
    const inbox = new VendorInbox({
      vendor: vendor._id,
      type: 'admin',
      title: `New message from Admin`,
      text: msg,
    });
    await inbox.save();
    return res.status(200).json({ status: true, message: 'Message sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = sendVendorMessage;
