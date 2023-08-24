const { Category, SubCategory, Service } = require('../models');

async function addService() {
  const service = new Service({
    name: 'AC Cleaning',
    description: 'Testing Service.' + Date.now(),
    price: 100,
    duration: '30min',
  });
  await service.save();
}
// addService();
//-----------------------------------------------------

async function getServices() {
  const services = await Service.find().select('-created_at -updated_at -__v');
  console.log(services);
}
// getServices();
// -----------------------------------------------------

async function addSubCategory() {
  const subCat = new SubCategory({
    name: 'AC services',
    description: 'Testing sub catego.' + Date.now(),
    services: ['64e70141cb931eca960927b0'],
  });
  await subCat.save();
}
// addSubCategory();
//-----------------------------------------------------

async function getSubCategories() {
  const categs = await SubCategory.find()
    .select('-created_at -updated_at -__v')
    .populate({ path: 'services', select: '-created_at -updated_at -__v' });
  console.log(categs);
}
// getSubCategories();
//-----------------------------------------------------

async function addCategory() {
  const cat = new Category({
    name: 'Repair and Maintanace',
    description: 'Testing Category.' + Date.now(),
    sub_categories: ['64e702373744a5d361513796'],
  });
  await cat.save();
}
// addCategory();
//-----------------------------------------------------

async function getCategories() {
  const categs = await Category.find({})
    .select('-created_at -updated_at -__v')
    .populate([
      {
        path: 'sub_categories',
        select: '-created_at -updated_at -__v',
      },
    ]);
  console.log(categs);
}
// getCategories();
//-----------------------------------------------------
