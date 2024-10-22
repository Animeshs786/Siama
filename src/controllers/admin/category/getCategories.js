const { Category } = require("../../../models");

const getCategories = async (req, res, next) => {
  try {
    const {
      sort_field = "user_id", // Default sort field
      sort_type = "asc", // Default sort type
      search,
      type,
    } = req.query;

    // Validate sort_type
    if (sort_type !== "asc" && sort_type !== "desc") {
      throw new ApiError("Invalid sort type", 400);
    }

    const findQuery = {};

    if (type) {
      findQuery.type = type;
    }

    if (search) {
      findQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const categs = await Category.find(findQuery).sort({
      [sort_field]: sort_type,
    });

    return res.status(200).json({
      status: true,
      message: "Category listingi",
      data: {
        categories: categs,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategories;
