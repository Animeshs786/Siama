const Condition = require("../../../models/condition");
const fs = require("fs");

const deleteCondition = async (req, res) => {
  try {
    const condition = await Condition.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: true, message: "Condition deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = deleteCondition;
