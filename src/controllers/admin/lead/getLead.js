const { ApiError } = require("../../../errorHandler");
const Lead = require("../../../models/lead");

const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("service");
    if (!lead) {
      return next(new ApiError("Invalid lead Id", 404));
    }
    res.status(200).json({
      status: true,
      data: { lead },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getLead;
