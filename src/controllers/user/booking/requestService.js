const { ApiError } = require('../../../errorHandler');
const { ServiceRequest } = require('../../../models');

const requestService = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, phone, email, industry, category, subcategory, requirement } = req.body;
    if (!name) throw new ApiError('name is required.', 400);
    if (!phone) throw new ApiError('phone is required.', 400);
    if (!industry) throw new ApiError('industry is required.', 400);
    if (!requirement) throw new ApiError('requirement is required.', 400);

    const request = new ServiceRequest({
      user: user._id,
      name,
      phone,
      email,
      industry,
      category,
      subcategory,
      requirement,
    });
    await request.save();
    return res.status(200).json({ status: true, message: 'Requested' });
  } catch (error) {
    next(error);
  }
};

module.exports = requestService;
