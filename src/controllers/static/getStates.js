const { State } = require('../../models');

const getStates = async (req, res, next) => {
  try {
    const states = await State.find();

    return res.status(200).json({
      status: true,
      message: 'States list.',
      data: {
        states,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getStates;
