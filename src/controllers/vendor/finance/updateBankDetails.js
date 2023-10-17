const { ApiError } = require('../../../errorHandler');

const updateBankDetails = async (req, res, next) => {
  try {
    const vendor = req.vendor;
    const { bank_name, acc_holder_name, acc_no, ifsc, branch } = req.body;
    if (!bank_name || !acc_holder_name || !acc_no || !ifsc || !branch)
      throw new ApiError('All fields are required.', 400);
    vendor.bank_details = {
      bank_name,
      acc_holder_name,
      acc_no,
      ifsc,
      branch,
    };
    await vendor.save();
    return res.status(201).json({ status: true, message: 'Bank details updated.' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBankDetails;
