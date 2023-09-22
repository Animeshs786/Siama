const { states } = require('./staticData');

const getStates = async (req, res, next) => {
  try {
    const data = states.map((state) => {
      return { name: state.name, value: state.value };
    });
    return res.status(200).json({ status: true, message: 'States list.', data: { data } });
  } catch (error) {
    next(error);
  }
};

const getCities = async (req, res, next) => {
  try {
    const state_value = req.params.state;
    const state = states.find((st) => st.value === state_value);
    let cities = [];
    if (state) cities = state.cities;
    return res.status(200).json({
      status: true,
      message: 'Cities list.',
      data: {
        cities,
      },
    });
  } catch (error) {
    next(error);
  }
};
function isValidState(st) {
  return Boolean(states.find((state) => state.value === st));
}
function isValidCity(state, city) {
  const s = states.find((s) => s.value === state);
  if (!s) return false;
  return Boolean(s.cities.find((c) => c.value === city));
}
module.exports = {
  getStates,
  isValidState,
  getCities,
  isValidCity,
};
