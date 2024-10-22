const { State } = require("../../../models");

const getState = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json({ status: true, data: states });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = getState;
