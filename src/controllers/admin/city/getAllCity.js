const { City } = require("../../../models");

const getAllCity = async (req, res) => {
  try {
    const cities = await City.find().populate("state", "name");
    res.status(200).json({ status: true, data: { cities } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = getAllCity;
