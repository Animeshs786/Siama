const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { SubCategory } = require("../../../models");
const Cart = require("../../../models/cart");
const { verifyAccessToken } = require("../../../utils");

const getSubCategories = async (req, res, next) => {
  try {
    const category_id = req.body.id;
    let userId = req.body.userId; // Get the userId from the request body

    if (category_id.length <= 0) {
      throw new ApiError("Category Id is required.", 400);
    }

    category_id.forEach((id) => {
      if (!isValidObjectId(id.trim())) {
        throw new ApiError(`Invalid Category ID: ${id}`, 400);
      }
    });

    const subcat = await SubCategory.find({
      category: { $in: category_id },
      status: true,
    }).populate("services");

    let cartProducts = [];
    if (userId) {
      const decoded = verifyAccessToken(userId);
      userId = decoded.id;
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cartProducts = cart.products.map((product) => ({
          productId: product.productId.toString(),
          quantity: product.quantity,
        }));
      }
    }

    const subcatWithCartInfo = subcat.map((sub) => {
      const productInCart = cartProducts.find(
        (p) => p.productId === sub._id.toString()
      );
      return {
        ...sub.toObject(),
        inCart: !!productInCart,
        quantity: productInCart ? productInCart.quantity : 0,
      };
    });

    return res.status(200).json({
      status: true,
      size: subcatWithCartInfo.length,
      message: "Sub Category Listing",
      data: subcatWithCartInfo,
    });
  } catch (error) {
    next(error);
  }
};

// const getSubCategories = async (req, res, next) => {
//   try {
//     const category_id = req.body.id || [];
//     const subCategoryIds = req.body.subCategoryIds || [];
//     let userId = req.body.userId; // Get the userId from the request body

//     // Validate category IDs if provided
//     if (category_id.length > 0) {
//       category_id.forEach((id) => {
//         if (!isValidObjectId(id.trim())) {
//           throw new ApiError(`Invalid Category ID: ${id}`, 400);
//         }
//       });
//     }

//     // Validate subcategory IDs if provided
//     if (subCategoryIds.length > 0) {
//       subCategoryIds.forEach((id) => {
//         if (!isValidObjectId(id.trim())) {
//           throw new ApiError(`Invalid SubCategory ID: ${id}`, 400);
//         }
//       });
//     }

//     let subcat = [];
//     if (category_id.length > 0) {
//       subcat = await SubCategory.find({ category: { $in: category_id } });
//     }

//     if (subCategoryIds.length > 0) {
//       // Get the parent categories of the provided subcategory IDs
//       const parentCategories = await SubCategory.find({ _id: { $in: subCategoryIds } }).distinct("category");
//       const additionalSubcats = await SubCategory.find({ category: { $in: parentCategories } });

//       // Combine the results, avoiding duplicates
//       const combinedSubcats = [...subcat, ...additionalSubcats].reduce((acc, curr) => {
//         if (!acc.find(sub => sub._id.toString() === curr._id.toString())) {
//           acc.push(curr);
//         }
//         return acc;
//       }, []);
//       subcat = combinedSubcats;
//     }

//     let cartProducts = [];
//     if (userId) {
//       const decoded = verifyAccessToken(userId);
//       userId = decoded.id;
//       const cart = await Cart.findOne({ userId });
//       if (cart) {
//         cartProducts = cart.products.map((product) => ({
//           productId: product.productId.toString(),
//           quantity: product.quantity,
//         }));
//       }
//     }

//     const subcatWithCartInfo = subcat.map((sub) => {
//       const productInCart = cartProducts.find(
//         (p) => p.productId === sub._id.toString()
//       );
//       return {
//         ...sub.toObject(),
//         inCart: !!productInCart,
//         quantity: productInCart ? productInCart.quantity : 0,
//       };
//     });

//     return res.status(200).json({
//       status: true,
//       size: subcatWithCartInfo.length,
//       message: "Sub Category Listing",
//       data: subcatWithCartInfo,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = getSubCategories;
