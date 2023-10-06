const { ApiError } = require('../../errorHandler');
const { State, City } = require('../../models');
const { isValidMongoId } = require('../../utils');

const getCities = async (req, res, next) => {
  try {
    const st_id = req.query.st_id;
    const search = req.query.search;
    const findObj = {};
    if (st_id) {
      if (!isValidMongoId(st_id)) throw new ApiError('State id is invalid', 400);
      const state = await State.findById(st_id);
      if (!state) throw new ApiError('State id is invalid', 400);
      findObj.state = st_id;
    }
    if (search) {
      findObj.name = { $regex: search, $options: 'i' };
    }
    const cities = await City.find(findObj);
    return res.status(200).json({
      status: true,
      message: 'Cities list.',
      data: {
        cities,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCities;
