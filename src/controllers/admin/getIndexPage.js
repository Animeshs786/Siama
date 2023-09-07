const getIndexPage = async (req, res, next) => {
  try {
    return res.render('index', { login: req.session.authenticated });
  } catch (error) {
    next(error);
  }
};
module.exports = getIndexPage;
