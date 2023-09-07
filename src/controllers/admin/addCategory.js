const { Category } = require('../../models');

const addCategory = async (req, res, next) => {
  try {
    const { name, desc } = req.body;
    console.log('add category', req.body);
    return res.end();
    if (!name || !desc) {
      return res.render('add_category', { message: 'Invalid Fields' });
    }
    const categ = new Category({
      name: name,
      description: desc,
    });
    await categ.save();
    return res.redirect('/admin/dashboard');
  } catch (error) {
    next(error);
  }
};
module.exports = addCategory;
