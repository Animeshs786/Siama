const isAdminLogin = async (req, res, next) => {
  try {
    if (req.session.authenticated) return next();
    return res.redirect('/admin/dashboard');
  } catch (error) {
    next(error);
  }
};
module.exports = isAdminLogin;
