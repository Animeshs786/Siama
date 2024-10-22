const Condition = require("../../../models/condition");

const getAllCondition = async (req, res) => {
  try {
    const { category } = req.query;
    const obj = {};
    if (category) {
      obj.category = category;
    }
    const conditions = await Condition.find(obj);
    res.status(200).json({
      status: true,
      data: { conditions },
    });
  } catch (err) {
    res.status(500).json({ status: true, message: err.message });
  }
};

module.exports = getAllCondition;
