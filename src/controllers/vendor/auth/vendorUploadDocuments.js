const fs = require("fs");
const multer = require("multer");
const { ApiError } = require("../../../errorHandler");
const { deleteOldFile } = require("../../../utils");
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf",
];
const { BASE_URL } = process.env;

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    if (!fs.existsSync("public/document"))
      fs.mkdirSync("public/document", { recursive: true });
    cb(null, "public/document");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = ".jpeg";
    const extI = originalname.lastIndexOf(".");
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `document-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10mb
  fileFilter: (req, file, cb) => {
    allowedMimeTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError("Invalid File type!", 400));
  },
}).fields([
  { name: "gst_certificate", maxCount: 1 },
  { name: "company_pan", maxCount: 1 },
  { name: "aadhar_card", maxCount: 1 },
  { name: "msme_certificate", maxCount: 1 },
  { name: "cancelled_cheque", maxCount: 1 },
  { name: "other_doc", maxCount: 1 },
]);

// req.files?.map(img => {
//   let imageID = img.originalname.slice(0, img.originalname.lastIndexOf("."));
//   images[imageID] = baseUrl() + "/images/" + img.originalname;
// });

const vendorUploadDocuments = async (req, res, next) => {
  // return res.status(301).json({
  //   status: true,
  //   message: 'The URL of the requested resource has been changed permanently.',
  //   new_endpoint: '/vendor/upload_documents/:doc_name',
  // });
  upload(req, res, async (error) => {
    try {
      const document = [];
      const vendor = req.vendor;
      if (error) throw new ApiError(error.message, 400);
      if (!req.files) throw new ApiError("All Documents is required", 400);
      console.log(req.files, "slfjsldjfs");
      if (!req.files?.gst_certificate)
        throw new ApiError("Gst Certificate is required.", 400);
      if (!req.files?.company_pan)
        throw new ApiError("Pan card is required.", 400);
      if (!req.files?.cancelled_cheque)
        throw new ApiError("Cancelled checked is required.", 400);
      if (!req.files?.aadhar_card)
        throw new ApiError("Aadhar card is required.", 400);

      // if (!req.files?.gst_certificate)
      //   throw new ApiError("Document 5 is required.", 400);
      // if (vendor.documents.length)
      //   throw new ApiError("Already submitted the documents", 400);

      Object.keys(req.files).map((key) => {
        const doc = req.files[key][0];
        document.push({
          name: doc.fieldname,
          file_type: doc.mimetype,
          file: `${doc.destination}/${doc.filename}`,
        });
      });
      vendor.documents = document;
      await vendor.save();
      return res.status(200).json({
        status: true,
        message: "Documents Uploaded",
        data: {
          documents: vendor.documents,
        },
      });
    } catch (error) {
      req.files &&
        Object.keys(req.files).map((key) => {
          const doc = req.files[key][0];
          deleteOldFile(`${doc.destination}/${doc.filename}`);
        });
      next(error);
    }
  });
};

module.exports = vendorUploadDocuments;
