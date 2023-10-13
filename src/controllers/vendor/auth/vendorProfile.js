const getVendorProfile = async (req, res, next) => {
  const vendor = req.vendor;
  try {
    return res.status(200).json({
      status: true,
      message: 'Vendor Profile Details.',
      data: {
        vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getVendorProfile;
