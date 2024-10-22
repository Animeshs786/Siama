const multer = require("multer");
const fs = require("fs");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const { ApiError } = require("../../../errorHandler");
const { Service, Category, SubCategory } = require("../../../models");
const { isValidObjectId } = require("mongoose");
const Home = require("../../../models/home");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/service")) {
      fs.mkdirSync("public/service", { recursive: true });
    }
    cb(null, "public/service");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `service-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError("Invalid image type", 400));
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const addService = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          throw new ApiError("File size should be less than 10MB", 400);
        }
        throw new ApiError(error.message, 400);
      }

      const {
        cat_id,
        scat_id,
        name,
        description,
        service_mode,
        service_charge,
        consult_charge,
        estimate_time,
        status,
        faq,
        serviceType,
        tags,
        aboutUs,
        benefits,
        postTreatmentCare,
        slug,
      } = req.body;

      if (!name) throw new ApiError("Service name is required.", 400);
      if (!cat_id) throw new ApiError("Category id is required.", 400);
      if (!slug) throw new ApiError("Service slug is required.", 400);

      // Check if category with the same slug already exists
      const serviceBySlug = await Service.findOne({ slug });
      if (serviceBySlug) throw new ApiError("Slug already exists", 400);

      if (!isValidObjectId(cat_id))
        throw new ApiError("Category id is invalid.", 400);
      const cat = await Category.findById(cat_id);
      if (!cat) throw new ApiError("Category id is invalid.", 400);

      if (!scat_id) throw new ApiError("Sub Category id is required.", 400);
      if (!isValidObjectId(scat_id))
        throw new ApiError("Sub Category id is invalid.", 400);
      const scat = await SubCategory.findById(scat_id);
      if (!scat) throw new ApiError("Sub Category id is invalid.", 400);

      if (!service_mode) throw new ApiError("service_mode is required.", 400);
      if (
        service_mode !== "online" &&
        service_mode !== "onsite" &&
        service_mode !== "both"
      )
        throw new ApiError("service_mode is invalid.", 400);
      if (!service_charge)
        throw new ApiError("Service charge is required.", 400);
      if (isNaN(service_charge))
        throw new ApiError("Invalid service charge", 400);

      if (consult_charge) {
        if (isNaN(consult_charge))
          throw new ApiError("Invalid consult charge", 400);
      }

      if (status && status !== "true" && status !== "false")
        throw new ApiError("Invalid status value", 400);

      let parseFaq;
      if (faq) {
        parseFaq = JSON.parse(faq);
      }
      let parseTag;

      if (tags) {
        parseTag = JSON.parse(tags);
      }

      let parseBenefits;
      if (benefits) {
        parseBenefits = JSON.parse(benefits);
      }

      let parsePostTreatmentCare;
      if (postTreatmentCare) {
        parsePostTreatmentCare = JSON.parse(postTreatmentCare);
      }

      const data = {
        category: cat_id,
        sub_category: scat_id,
        name,
        description: description || "",
        service_mode,
        service_charge,
        consult_charge: consult_charge || "0",
        estimate_time: estimate_time || "",
        status: status === "true" ? true : false,
        faq: parseFaq,
        bestTreatment: serviceType === "bestTreatment" ? true : false,
        popularProduct: serviceType === "popularProduct" ? true : false,
        tags: parseTag,
        benefits: parseBenefits,
        aboutUs,
        postTreatmentCare: parsePostTreatmentCare,
        slug,
      };

      if (req.files.image) {
        const url = `${req.files.image[0].destination}/${req.files.image[0].filename}`;
        data.image = url;
      }

      if (req.files.images) {
        const imageUrls = req.files.images.map(
          (file) => `${file.destination}/${file.filename}`
        );
        data.images = imageUrls;
      }

      const service = new Service(data);
      await service.save();
      scat.services.push(service._id);
      scat.save();
      const home = await Home.findById("664d9d801ab345f4917d7ba3");

      if (service.popularProduct) {
        if (service.category.toString() === "665451b416a3fd61d1e6e104") {
          home.popularProductsWomen.push(service._id);
        } else {
          home.popularProductsMen.push(service._id);
        }
      }

      if (service.bestTreatment) {
        if (service.category.toString() === "665451b416a3fd61d1e6e104") {
          home.bestTreatmentsWomen.push(service._id);
        } else {
          home.bestTreatmentsMen.push(service._id);
        }
      }
      await home.save();

      return res.status(201).json({
        status: true,
        message: "Service added.",
        data: {
          service: service,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = addService;
