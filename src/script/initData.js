const { Admin } = require('../models');
const bcrypt = require('bcrypt');

async function createFirstAdmin() {
  const result = await Admin.findOne();
  if (result) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);
  const admin = new Admin({
    first_name: 'Rajat',
    last_name: 'Kumar',
    phone: '6392985407',
    email: 'rajat@gmail.com',
    password: hashedPassword,
  });
  await admin.save();
}
const initData = async () => {
  await createFirstAdmin();
};
module.exports = initData;
