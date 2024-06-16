const upload = require("../middleware/s3_v3.upload.cjs");

const uploadFile = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log(err)
      return res.status(400).send({
        result: 0,
        message: err,
      });
    }
    res.status(200).send({
      result: 1,
      message: "File uploaded successfully: " + req.file.originalname,
    });
  });
};

module.exports = {
  uploadFile,
};
