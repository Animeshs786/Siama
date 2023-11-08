const { default: axios } = require('axios');
const { ApiError } = require('../../errorHandler');
const { State, City } = require('../../models');

const getAddressByPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;
    if (isNaN(pincode) || pincode.length !== 6) throw new ApiError('Invalid Pincode', 400);
    const response = await axios({
      method: 'GET',
      url: `https://api.worldpostallocations.com/pincode?postalcode=${pincode}&countrycode=IN&apikey=1321-9b1e00f8-f861e00c-7df5f89c-905a686549e14d36cd2`,
    });
    if (!response.data.result.length) throw new ApiError('Not Found', 400);
    const data = response.data.result[0];
    const state = await State.findOne({ name: data.state });
    if (!state) throw new ApiError('Not Found', 400);

    const city = await City.findOne({ state: state._id, name: data.district });
    return res.status(200).json({
      status: true,
      message: 'state and city by pin',
      data: {
        state,
        city,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAddressByPincode;
/**
 {
      id: '378457',
      country: 'IN',
      postalCode: '211013',
      postalLocation: 'Gohari',
      state: 'Uttar Pradesh',
      stateId: '36',
      district: 'Allahabad',
      districtId: '175',
      province: 'Phaphamau',
      provinceId: '',
      latitude: '25.8695',
      longitude: '81.6505'
  },
 */
