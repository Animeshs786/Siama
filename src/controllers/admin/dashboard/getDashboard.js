const Checkout = require("../../../models/checkout");
const { User, Vendor } = require("../../../models");

const getDashboard = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [
      todayOrderCount,
      todayUserCount,
      todayRevenueResult,
      totalOrderCount,
      totalRevenueResult,
      totalUserCount,
      totalVendorCount,
    ] = await Promise.all([
      Checkout.countDocuments({
        createAt: { $gte: startOfDay, $lt: endOfDay },
      }),
      User.countDocuments({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      }),
      Checkout.aggregate([
        {
          $match: {
            status: "success",
            createAt: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        { $group: { _id: null, totalRevenue: { $sum: "$payableAmount" } } },
      ]),
      Checkout.countDocuments(),
      Checkout.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, totalRevenue: { $sum: "$payableAmount" } } },
      ]),
      User.countDocuments(),
      Vendor.countDocuments(),
    ]);

    const todayRevenue =
      todayRevenueResult.length > 0 ? todayRevenueResult[0].totalRevenue : 0;
    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    res.status(200).json({
      status: true,
      data: {
        todayOrderCount,
        todayUserCount,
        todayRevenue,
        totalOrderCount,
        totalRevenue,
        totalUserCount,
        totalVendorCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
