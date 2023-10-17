const getAllTexes = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: true,
      message: '',
      data: {
        gst: '18%',
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTexes;
