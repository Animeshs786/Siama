const multer = require("multer");
const fs = require("fs");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const { isValidObjectId } = require("mongoose");
const { Service, Category, SubCategory } = require("../../../models");
const { ApiError } = require("../../../errorHandler");
const { deleteOldFile } = require("../../../utils");
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
}).fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const updateService = async (req, res, next) => {
  upload(req, res, async (error) => {
    try {
      if (error) throw new ApiError(error.message, 400);
      const id = req.params.id;
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
      if (!isValidObjectId(id)) throw new ApiError("Invalid id", 400);
      const service = await Service.findById(id);
      if (!service) throw new ApiError("Bad Request", 400);

      if (slug && slug !== service.slug) {
        const result = await Service.findOne({ slug });
        if (result) throw new ApiError("Slug is already used.", 409);
        service.slug = slug;
      }

      if (cat_id && cat_id !== service.category) {
        if (!isValidObjectId(cat_id))
          throw new ApiError("Category id is invalid.", 400);
        const cat = await Category.findById(cat_id);
        if (!cat) throw new ApiError("Category id is invalid.", 400);
        service.category = cat_id;
        service.sub_category = null;
        if (scat_id) {
          if (!isValidObjectId(scat_id))
            throw new ApiError("Sub Category id is invalid.", 400);
          const scat = await SubCategory.findById(scat_id, {
            category: cat_id,
          });
          if (!scat) throw new ApiError("Sub Category id is invalid.", 400);
          service.sub_category = scat._id;
        }
      }

      if (name) service.name = name;
      if (description) service.description = description;

      if (tags) {
        // parseTag = JSON.parse(tags);
        service.tags = tags;
      }

      if (benefits) {
        parseBenefits = JSON.parse(benefits);
        service.benefits = parseBenefits;
      }

      if (postTreatmentCare) {
        parsePostTreatmentCare = JSON.parse(postTreatmentCare);
        service.postTreatmentCare = parsePostTreatmentCare;
      }

      if (aboutUs) {
        service.aboutUs = aboutUs;
      }

      if (service_mode) {
        if (
          service_mode !== "online" &&
          service_mode !== "onsite" &&
          service_mode !== "both"
        )
          throw new ApiError("service_mode is invalid.", 400);
        service.service_mode = service_mode;
      }
      if (service_charge) {
        if (isNaN(service_charge))
          throw new ApiError("Invalid service charge", 400);
        service.service_charge = service_charge;
      }

      if (consult_charge) {
        if (isNaN(consult_charge))
          throw new ApiError("consult_charge is invalid", 400);
        service.consult_charge = consult_charge;
      }
      if (estimate_time) service.estimate_time = estimate_time;
      if (status) {
        if (status !== "true" && status !== "false")
          throw new ApiError("Invalid status value", 400);
        service.status = status;
      }

      if (req.files?.image) {
        await deleteOldFile(service.image);
        const url = `${req.files.image[0].destination}/${req.files.image[0].filename}`;
        service.image = url;
      }

      if (req.files?.images) {
        if (service.images && service.images.length) {
          for (const imgPath of service.images) {
            await deleteOldFile(imgPath);
          }
        }
        const imageUrls = req.files.images.map(
          (file) => `${file.destination}/${file.filename}`
        );
        service.images = imageUrls;
      }

      if (faq) {
        const parseFaq = JSON.parse(faq);
        service.faq = parseFaq;
      }

      if (!tags) {
        if (serviceType === "bestTreatment") {
          service.bestTreatment = true;
          service.popularProduct = false;
        }

        if (serviceType === "popularProduct") {
          service.popularProduct = true;
          service.bestTreatment = false;
        }

        if (!serviceType || serviceType === "") {
          service.popularProduct = false;
          service.bestTreatment = false;
        }
      }

      await service.save();

      if (!tags) {
        const home = await Home.findById("664d9d801ab345f4917d7ba3");

        if (service.popularProduct) {
          if (service.category.toString() === "665451b416a3fd61d1e6e104") {
            home.popularProductsWomen.push(service._id);
          } else {
            home.popularProductsMen.push(service._id);
          }
        }

        if (!service.popularProduct) {
          if (service.category.toString() === "665451b416a3fd61d1e6e104") {
            home.popularProductsWomen.pull(service._id);
          } else {
            home.popularProductsMen.pull(service._id);
          }
        }

        if (service.bestTreatment) {
          if (service.category.toString() === "665451b416a3fd61d1e6e104") {
            home.bestTreatmentsWomen.push(service._id);
          } else {
            home.bestTreatmentsMen.push(service._id);
          }
        }

        if (!service.bestTreatment) {
          if (service.category.toString() === "665451b416a3fd61d1e6e104") {
            home.bestTreatmentsWomen.pull(service._id);
          } else {
            home.bestTreatmentsMen.pull(service._id);
          }
        }

        await home.save();
      }

      return res.status(201).json({
        status: true,
        message: "Service updated",
        data: {
          service,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};
module.exports = updateService;
