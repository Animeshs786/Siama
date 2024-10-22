const { Admin } = require('../models');
const bcrypt = require('bcrypt');

async function createFirstAdmin() {
  const result = await Admin.findOne();
  if (result) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  const admin = new Admin({
    name: 'Farhan Saifi',
    phone: '8130289007',
    email: 'admin@gmail.com',
    password: hashedPassword,
  });
  await admin.save();
  console.log('admin crated', admin.toJSON());
}
const initData = async () => {
  await createFirstAdmin();
};
module.exports = initData;
