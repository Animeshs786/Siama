const Lead = require("../../../models/lead");

const getAllLead = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort("-createdAt").populate("service","name");
    res.status(200).json({
      status: true,
      data: { leads },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllLead;
