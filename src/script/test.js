const { Category, SubCategory, Service } = require('../models');

async function addService() {
  const service = new Service({
    name: 'Test - AC Cleaning',
    description: 'Testing Service. Description ' + Date.now(),
    mrp: 300,
    selling_price: 200,
    consult_required: true,
    consult_fee: 50,
    estimate_time: '30min',
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
    name: 'Test - AC services',
    description: 'Testing sub catego. This is just a description.' + Date.now(),
    // services: [],
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
    name: 'Test - Home Repairs and Paintings',
    description: 'Testing Category. This is just a description.' + Date.now(),
    // sub_categories: ['64e702373744a5d361513796'],
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
async function addSubCategoryToCategory(cat_id, sub_id) {
  await Category.findByIdAndUpdate(cat_id, {
    $push: { sub_categories: sub_id },
  });
}
// addSubCategoryToCategory('64f85261b764a68e6332d8a0', '64f85721c9bf6d698bf6e0d2');
//-----------------------------------------------------

async function addServiceToSubCategory(sub_id, serv_id) {
  await SubCategory.findByIdAndUpdate(sub_id, {
    $push: { services: serv_id },
  });
}
// addServiceToSubCategory('64f85721c9bf6d698bf6e0d2', '64f85d01c8ece51b93683351');
//-----------------------------------------------------
