const { Service } = require('../../models');

const addService = async (req, res, next) => {
  try {
    const { name, desc, price, duration } = req.body;
    console.log(req.body);
    if (!name || !desc) {
      return res.render('add_service', { message: 'Invalid Fields' });
    }
    const service = new Service({
      name: name,
      description: desc,
      price: price,
    });
    await service.save();
    return res.redirect('/admin/dashboard');
  } catch (error) {
    next(error);
  }
};
module.exports = addService;
