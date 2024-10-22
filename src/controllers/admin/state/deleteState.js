const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedState = await State.findByIdAndDelete(id);
    if (!deletedState) {
      return res
        .status(404)
        .json({ status: false, message: "State not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "State delete successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = deleteState;
