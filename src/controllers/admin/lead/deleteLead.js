const { ApiError } = require("../../../errorHandler");
const Lead = require("../../../models/lead");

const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return next(new ApiError("Something went wrong.", 404));
    }

    res.status(200).json({
      status: true,
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLead;
