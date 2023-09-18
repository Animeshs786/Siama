const { Admin } = require('../../../models');

const getAdminProfile = async (req, res, next) => {
  try {
    const id = req.admin._id;
    const admin = await Admin.findById(id).select('-password -created_at -updatedAt -__v');
    return res.status(200).json({
      status: true,
      message: 'Admin Profile.',
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAdminProfile;
