const { Category, Service } = require('../../models');

const getDashboard = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const services = await Service.find();
    const data = {
      categories,
      services,
    };
    return res.render('dashboard', { data });
  } catch (error) {
    next(error);
  }
};
module.exports = getDashboard;
