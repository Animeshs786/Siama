const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../../../errorHandler");
const { Service, SubCategory } = require("../../../models");
const Cart = require("../../../models/cart");
const { verifyAccessToken } = require("../../../utils");
const Condition = require("../../../models/condition");

const getServicesBySubCat = async (req, res, next) => {
  try {
    const {
      id: sub_category_slug = [],
      userId,
      serviceId:serviceSlug,
      tags: tagSlugs,
    } = req.body;

    let subCategorySlugs = [...sub_category_slug];

    if (serviceSlug) {
      const service = await Service.findOne({ slug: serviceSlug });
      if (!service) {
        throw new ApiError(`Service not found for slug: ${serviceSlug}`, 404);
      }
      const serviceSubCategorySlug = service.sub_category.toString();

      if (!subCategorySlugs.includes(serviceSubCategorySlug)) {
        subCategorySlugs.push(serviceSubCategorySlug);
      }
    }

    if (!tagSlugs || tagSlugs?.length > 0) {
      if (subCategorySlugs.length <= 0) {
        throw new ApiError("Subcategory slug is required.", 400);
      }

      // Validate the slugs here if necessary
      subCategorySlugs.forEach((slug) => {
        if (!slug.trim()) {
          throw new ApiError(`Invalid Subcategory slug: ${slug}`, 400);
        }
      });
    }

    let subCategoryIds = [];
    if (subCategorySlugs.length > 0) {
      const subCategories = await SubCategory.find({
        slug: { $in: subCategorySlugs },
      });
      subCategoryIds = subCategories.map((subCategory) =>
        subCategory._id.toString()
      );
    }

    let tagIds = [];
    if (tagSlugs && tagSlugs.length > 0) {
      const tags = await Condition.find({ slug: { $in: tagSlugs } });
      tagIds = tags.map((tag) => tag._id.toString());
    }

    let subcat;

    if (!tagSlugs || tagSlugs?.length <= 0) {
      subcat = await Service.find({
        sub_category: { $in: subCategoryIds },
        status: true,
      }).populate("reviews");
    }

    if (tagSlugs?.length > 0) {
      subcat = await Service.find({
        tags: { $in: tagIds },
        status: true,
      }).populate("reviews");
    }

    let cartProducts = [];
    if (userId) {
      const decoded = verifyAccessToken(userId);
      const userIdDecoded = decoded.id;
      const cart = await Cart.findOne({ userId: userIdDecoded });

      if (cart) {
        cartProducts = cart.products.map((product) => ({
          productId: product.productId.toString(),
          quantity: product.quantity,
        }));
      }
    }

    let subcatWithCartInfo = subcat.map((sub) => {
      const productInCart = cartProducts.find(
        (p) => p.productId === sub._id.toString()
      );
      return {
        ...sub.toObject(),
        inCart: !!productInCart,
        quantity: productInCart ? productInCart.quantity : 0,
      };
    });

    // Sort the services to have the one with the provided serviceSlug at the top
    if (serviceSlug) {
      subcatWithCartInfo = subcatWithCartInfo.sort((a, b) => {
        if (a.slug === serviceSlug) return -1;
        if (b.slug === serviceSlug) return 1;
        return 0;
      });
    }

    return res.status(200).json({
      status: true,
      size: subcatWithCartInfo.length,
      message: "Services Listing",
      data: subcatWithCartInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getServicesBySubCat;
