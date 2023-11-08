const getOtp = (length = 4) => {
  // return '1234';
  // return Math.floor(Math.random() * 9999) + 1000;
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = getOtp;
