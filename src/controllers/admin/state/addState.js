const { State } = require("../../../models");

const addState = async (req, res) => {
  try {
    const { name, stateCode, country } = req.body;
    const newState = new State({ name, stateCode, country });
    const state = await newState.save();
    res.status(201).json({ status: true, data: { state } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = addState;
