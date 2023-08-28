const bcrypt = require('bcrypt');
const { Admin } = require('../../models');

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const respData = {
      data: req.body,
      error: null,
    };
    if (!email) {
      respData.error = { field: 'email', message: 'Email ID is required.' };
      return res.render('login', respData);
    }
    if (!password) {
      respData.error = { field: 'password', message: 'Password is required.' };
      return res.render('login', respData);
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      respData.error = { field: 'common', message: 'Invalid email ID.' };
      return res.render('login', respData);
    }

    const passMatch = await bcrypt.compare(password, admin.password);
    if (!passMatch) {
      respData.error = { field: 'common', message: 'Invalid Password.' };
      return res.render('login', respData);
    }
    req.session.authenticated = true;
    req.session.admin_id = admin._id;
    return res.redirect('/admin/dashboard');
  } catch (error) {
    next(error);
  }
};

module.exports = loginAdmin;
