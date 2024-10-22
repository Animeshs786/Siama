const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { SubCategory } = require("../../../models");

const getSubCategories = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total_data = await SubCategory.countDocuments();
    const totalPages = Math.ceil(total_data / limit);

    const { cat_id, search } = req.query;
    const findObj = {};

    if (search) {
      findObj.name = { $regex: search, $options: "i" };
    }

    if (cat_id) {
      if (!isValidObjectId(cat_id))
        throw new ApiError("Category id is invalid.", 400);
      findObj.category = cat_id;
    }

    const subcats = await SubCategory.find(findObj)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "category",
        select: "name",
      });
    return res.status(200).json({
      status: true,
      size: subcats.length,
      message: "Subcategory listing",
      data: {
        subcategories: subcats,
      },
      totalPages,
      total_data,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getSubCategories;
/*
  const categs = await SubCategory.find().populate({
      path: 'services',
      select: 'name',
    });
*/