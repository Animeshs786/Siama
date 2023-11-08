const { default: axios } = require('axios');

async function sendOtpToPhone(phone, otp) {
  const response = await axios({
    method: 'POST',
    url: 'https://api.msg91.com/api/v5/flow/',
    headers: {
      authkey: '285140ArLurg2KnR61e3d660P1',
      'Content-Type': 'application/JSON',
    },
    data: {
      flow_id: '61e91e0ebcf97d01fc2bff63',
      mobiles: `91${phone}`,
      otp: otp,
    },
  });
  const data = response.data;
  console.log('msg res:\n', data);
}

// sendOtpToPhone();
module.exports = sendOtpToPhone;
