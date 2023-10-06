const { ApiError } = require('../../../errorHandler');
const { Address, User, State, City } = require('../../../models');

const addAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('saved_address');
    const { name, phone, state: state_id, city: city_id, pincode, building, landmark } = req.body;
    if (!name) throw new ApiError('Name is required.', 400);
    if (!phone) throw new ApiError('Phone is required.', 400);

    if (!state_id) throw new ApiError('State id is required.', 400);
    const state = await State.findById(state_id);
    if (!state) throw new ApiError('Invalid State id', 400);

    if (!city_id) throw new ApiError('City id is required.', 400);
    const city = await City.findById(city_id);
    if (!city) throw new ApiError('Invalid City name', 400);

    if (!pincode) throw new ApiError('Pincode is required.', 400);
    if (!building) throw new ApiError('Building name is required.', 400);
    if (!landmark) throw new ApiError('Landmark is required.', 400);

    if (user.saved_address.length >= 5) throw new ApiError('You cannot add more than 5 addresses.', 400);
    const address = new Address({
      name,
      phone,
      state_id: state._id,
      state: state.name,
      city_id: city._id,
      city: city.name,
      pincode,
      building,
      landmark,
    });
    await address.save();
    user.saved_address.push(address._id);
    await user.save();
    return res.status(200).json({ status: true, message: 'Address Added' });
  } catch (error) {
    next(error);
  }
};

module.exports = addAddress;
