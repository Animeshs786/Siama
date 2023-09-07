const getServiceForm = async (req, res, next) => {
  try {
    return res.render('add_service');
  } catch (error) {
    next(error);
  }
};
module.exports = getServiceForm;
