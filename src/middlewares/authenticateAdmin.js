const authenticateAdmin = async (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect('/admin');
};

module.exports = authenticateAdmin;
