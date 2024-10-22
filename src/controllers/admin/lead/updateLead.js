const Lead = require("../../../models/lead");

const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, number, state, address, city, service } = req.body;
    const updateObj = {};
    if (name) updateObj.name = name;
    if (number) updateObj.number = number;
    if (state) updateObj.state = state;
    if (address) updateObj.address = address;
    if (city) updateObj.city = city;
    if (service) updateObj.service = service;

    const lead = await Lead.findByIdAndUpdate(id, updateObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: true,
      message: "Lead updated successfully",
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateLead;
