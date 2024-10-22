const Condition = require("../../../models/condition");

const getCondition = async (req, res) => {
  try {
    const condition = await Condition.findById(req.params.id);
    if (!condition) {
      return res
        .status(404)
        .json({ status: false, message: "Condition not found" });
    }
    res.status(200).json({ status: true, data: condition });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = getCondition;
