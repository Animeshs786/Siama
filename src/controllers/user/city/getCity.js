const City = require("../../../models/city");
const State = require("../../../models/state");

const getCity = async (req, res) => {
  try {
    const { stateId } = req.params;

    // Validate state existence
    const stateExists = await State.findById(stateId);
    if (!stateExists) {
      return res
        .status(404)
        .json({ status: false, message: "State not found" });
    }

    const cities = await City.find({ state: stateId });
    res.status(200).json({ status: true, data: cities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
module.exports = getCity;
