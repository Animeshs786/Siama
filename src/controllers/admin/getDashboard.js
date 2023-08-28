const getDashboard = async (req, res, next) => {
  try {
    return res.render('dashboard');
  } catch (error) {
    next(error);
  }
};
module.exports = getDashboard;
