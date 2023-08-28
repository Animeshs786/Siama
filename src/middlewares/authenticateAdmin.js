const authenticateAdmin = async (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect('/admin/login');
};

module.exports = authenticateAdmin;
