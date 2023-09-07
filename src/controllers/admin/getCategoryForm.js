const { SubCategory } = require('../../models');

const getCategoryForm = async (req, res, next) => {
  try {
    const sub_catgs = await SubCategory.find();
    return res.render('add_category', { sub_catgs });
  } catch (error) {
    next(error);
  }
};
module.exports = getCategoryForm;
