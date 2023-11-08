const getAddressByPincode = require('./getAddressByPincode');
const getCities = require('./getCities');
const getStates = require('./getStates');
// const getStates = async (req, res, next) => {
//   try {
//     const data = states.map((state) => {
//       return { name: state.name, value: state.value };
//     });
//     return res.status(200).json({ status: true, message: 'States list.', data: { data } });
//   } catch (error) {
//     next(error);
//   }
// };
// const getCities = async (req, res, next) => {
//   try {
//     const state_value = req.params.state;
//     const state = states.find((st) => st.value === state_value);
//     let cities = [];
//     if (state) cities = state.cities;
//     return res.status(200).json({
//       status: true,
//       message: 'Cities list.',
//       data: {
//         cities,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getStates,
  getCities,
  getAddressByPincode,
};
