const { isValidObjectId } = require('mongoose');
const { Vendor, VendorInbox } = require('../../../models');
const { ApiError } = require('../../../errorHandler');

const verifyVendorDocs = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { doc_id, status, reason } = req.body;
    if (!isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const vendor = await Vendor.findById(id);
    if (!vendor) throw new ApiError('Invalid id', 400);
    if (!isValidObjectId(doc_id)) throw new ApiError('Invalid Document id', 400);
    if (status !== 'true' && status !== 'false') throw new ApiError('Invalid status value [true,false]', 400);

    const i = vendor.documents.findIndex((doc) => doc._id.toString() === doc_id);
    if (i === -1) throw new ApiError('Invalid Document Id', 400);

    if (status === 'false') {
      if (!reason) throw new ApiError('Please provide reason.', 400);
      const inbox = new VendorInbox({
        vendor: vendor._id,
        type: 'admin',
        title: `Invalid Document: ${vendor.documents[i].name}`,
        text: reason,
      });
      await inbox.save();
      vendor.documents.splice(i, 1);
      await vendor.save();
      return res.status(200).json({ status: true, message: 'Status updated' });
    }

    vendor.documents[i].verified = true;
    await vendor.save();
    return res.status(200).json({ status: true, message: 'Status updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyVendorDocs;

/*
id1 [ ObjectId ]  and id2 [ ObjectId ]
  id1.equals(id2) // true
  id1 === id2 //true

id1 [ObjectId]  and id2 [string]
  id1.toString() === id2 //true

 */
