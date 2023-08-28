const logoutAdmin = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.redirect('/admin/login');
  } catch (error) {
    next(error);
  }
};

module.exports = logoutAdmin;
