const isAdminLogout = async (req, res, next) => {
  try {
    if (!req.session.authenticated) return next();
    else return res.redirect('/admin/dashboard');
  } catch (error) {
    next(error);
  }
};
module.exports = isAdminLogout;
