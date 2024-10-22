const { State, City } = require("../../../models");

const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state } = req.body;

    // Validate state existence if state is provided in the request body
    if (state) {
      const stateExists = await State.findById(state);
      if (!stateExists) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid state ID" });
      }
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name, state },
      { new: true, runValidators: true }
    ).populate("state", "name");

    if (!updatedCity) {
      return res.status(404).json({ status: false, message: "City not found" });
    }
    res.status(200).json({ status: true, data: updatedCity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = updateCity;
