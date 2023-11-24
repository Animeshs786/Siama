const { default: axios } = require('axios');
const { User } = require('../models');

// async function addService() {
//   const service = new Service({
//     name: 'Home Painting',
//     description: 'Testing Service. Description ' + Date.now(),

//     service_charge: 1500,
//     consult_required: true,
//     consult_charge: 100,
//     estimate_time: '10 Days',
//   });
//   await service.save();
// }
// addService();
//-----------------------------------------------------

// async function getServices() {
//   const services = await Service.find().select('-created_at -updated_at -__v');
//   console.log(services);
// }
// getServices();
// -----------------------------------------------------

// async function addSubCategory() {
//   const subCat = new SubCategory({
//     name: 'Test - AC services',
//     description: 'Testing sub catego. This is just a description.' + Date.now(),
//     // services: [],
//   });
//   await subCat.save();
// }
// addSubCategory();
//-----------------------------------------------------

// async function getSubCategories() {
//   const categs = await SubCategory.find()
//     .select('-created_at -updated_at -__v')
//     .populate({ path: 'services', select: '-created_at -updated_at -__v' });
//   console.log(categs);
// }
// getSubCategories();
//-----------------------------------------------------

// async function addCategory() {
//   const cat = new Category({
//     name: 'Car Repair - 1',
//     description: 'Car Repair - 1' + Date.now(),
//     // sub_categories: ['64e702373744a5d361513796'],
//   });
//   await cat.save();
// }
// addCategory();
//-----------------------------------------------------

// async function getCategories() {
//   const categs = await Category.find({})
//     .select('-created_at -updated_at -__v')
//     .populate([
//       {
//         path: 'sub_categories',
//         select: '-created_at -updated_at -__v',
//       },
//     ]);
//   console.log(categs);
// }
// getCategories();
//-----------------------------------------------------
// async function addSubCategoryToCategory(cat_id, sub_id) {
//   await Category.findByIdAndUpdate(cat_id, {
//     $push: { sub_categories: sub_id },
//   });
// }
// addSubCategoryToCategory('64face2208af6ce6535409d6', '64f85721c9bf6d698bf6e0d2');
//-----------------------------------------------------

// async function addServiceToSubCategory(sub_id, serv_id) {
//   await SubCategory.findByIdAndUpdate(sub_id, {
//     $push: { services: serv_id },
//   });
// }
// addServiceToSubCategory('64f85721c9bf6d698bf6e0d2', '64f85d01c8ece51b93683351');
//-----------------------------------------------------

// async function addServiceToCategory(cat_id, serv_id) {
//   await Category.findByIdAndUpdate(cat_id, {
//     $push: { services: serv_id },
//   });
// }
// addServiceToCategory('64fad1eec8590d2967fa8f95', '64f97d6b3f26cfe7527618af');
//-----------------------------------------------------

// async function addServiceToUserCart(user_id, serv_id) {
//   await User.findByIdAndUpdate(user_id, {
//     $push: { cart: { service: serv_id } },
//   });
// }
// addServiceToUserCart('64f873f20aab90276f82b428', '64f97d6b3f26cfe7527618af');
//-----------------------------------------------------
// async function testt() {
//   const states = data;

//   try {
//     for (let i = 0; i < states.length; i++) {
//       console.log('saving state ', i + 1);
//       const state = states[i];
//       const newstate = new State({
//         name: state.name,
//         value: state.name
//           .split(' ')
//           .map((str) => str.toLowerCase())
//           .join('_'),
//         state_code: state.state_code,
//       });
//       await newstate.save();
//       if (state.cities.length) {
//         for (let j = 0; j < state.cities.length; j++) {
//           console.log('saving city ', i + 1, j + 1);
//           const city = state.cities[j];
//           const newcity = new City({
//             state: newstate._id,
//             name: city.name,
//             value: city.name
//               .split(' ')
//               .map((str) => str.toLowerCase())
//               .join('_'),
//           });
//           await newcity.save();
//         }
//       }
//     }
//     console.log('Data Saved.');
//   } catch (error) {
//     console.log(error.message);
//     await City.deleteMany();
//     await State.deleteMany();
//   }
// }

// async function test() {
//   const response = await axios({
//     method: 'GET',
//     url: 'https://api.worldpostallocations.com/pincode?postalcode=&countrycode=IN&apikey=1321-9b1e00f8-f861e00c-7df5f89c-905a686549e14d36cd2',
//   });
//   console.log(response.data);
// }
// test();
