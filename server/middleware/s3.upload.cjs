const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      if (file.fieldname == "singlefile") {
        cb(null, "single/" + file.originalname);
      } else if (file.fieldname == "multiplefiles") {
        cb(null, "multiple/" + file.originalname);
      }
    },
  }),
});

module.exports = upload.fields([
  { name: "singlefile", maxCount: 1 },
  { name: "multiplefiles", maxCount: 5 },
]);
