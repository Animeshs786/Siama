const getLoginPage = async (req, res, next) => {
  try {
    return res.render('login');
  } catch (error) {
    next(error);
  }
};

module.exports = getLoginPage;
