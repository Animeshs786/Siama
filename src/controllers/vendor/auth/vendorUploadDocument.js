const fs = require('fs');
const multer = require('multer');
const { ApiError } = require('../../../errorHandler');
const { deleteOldFile } = require('../../../utils');
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
const { BASE_URL } = process.env;

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    if (!fs.existsSync('public/document')) fs.mkdirSync('public/document', { recursive: true });
    cb(null, 'public/document');
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    let fileExt = '.jpeg';
    const extI = originalname.lastIndexOf('.');
    if (extI !== -1) {
      fileExt = originalname.substring(extI).toLowerCase();
    }
    const fileName = `document-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const vendor_docs = ['doc1', 'doc2', 'doc3', 'doc4', 'doc5'];

function getUploader(doc) {
  const uploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new ApiError('Invalid image type', 400));
    },
  }).single(doc);
  return uploader;
}

const vendorUploadDocument = async (req, res, next) => {
  const doc_name = req.params.doc;
  if (!vendor_docs.includes(doc_name)) next(new ApiError('Bad Request', 400));
  const upload = getUploader(doc_name);
  upload(req, res, async (error) => {
    try {
      const vendor = req.vendor;
      if (error) throw new ApiError(error.message, 400);
      if (!req.file) throw new ApiError('Documents is required', 400);

      const find = vendor.documents.find((doc) => doc.name === doc_name);
      if (find) throw new ApiError(`${find.name} is already uploaded`, 409);
      vendor.documents.push({
        name: req.file.fieldname,
        file_type: req.file.mimetype,
        file: BASE_URL + req.file.path,
      });
      await vendor.save();
      return res.status(200).json({
        status: true,
        message: 'Documents Uploaded',
        data: {
          documents: vendor.documents,
        },
      });
    } catch (error) {
      req.file && deleteOldFile(req.file.path);
      next(error);
    }
  });
};

module.exports = vendorUploadDocument;
