const { State } = require("../../../models");

const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!state) {
      return res
        .status(404)
        .json({ status: false, message: "State not found" });
    }
    res.status(200).json({ status: true, data: { state } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = updateState;
