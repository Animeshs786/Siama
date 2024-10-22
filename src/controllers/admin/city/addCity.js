const { ApiError } = require("../../../errorHandler");
const { State, City } = require("../../../models");

const addCity = async (req, res) => {
  try {
    const { name, state } = req.body;

    if (!state) throw new ApiError("State Id must be required.", 400);

    const stateExists = await State.findById(state);
    if (!stateExists) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid state ID" });
    }

    const newCity = new City({ name, state });
    const city = await newCity.save();
    res.status(201).json({ status: true, data: { city } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = addCity;
