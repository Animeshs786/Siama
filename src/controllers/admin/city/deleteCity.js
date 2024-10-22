const { City } = require("../../../models");

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({ status: false, message: "City not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "City delete successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = deleteCity;
