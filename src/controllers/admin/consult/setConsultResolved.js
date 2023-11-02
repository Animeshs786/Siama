const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../../../errorHandler');
const { Consult } = require('../../../models');

const setConsultResolved = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id || !isValidObjectId(id)) throw new ApiError('Invalid id', 400);
    const consult = await Consult.findById(id);
    if (!consult) throw new ApiError('Invalid id', 400);
    if (consult.consult_status === 'completed')
      return res.status(200).json({ status: true, message: 'Already resolved' });
    if (consult.consult_status !== 'paid') throw new ApiError('Consult is yet to be paid', 400);
    consult.consult_status = 'completed';
    await consult.save();
    return res.status(201).json({ status: true, message: 'Consult updated as resolved' });
  } catch (error) {
    next(error);
  }
};

module.exports = setConsultResolved;
