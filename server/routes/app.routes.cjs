const express = require("express");
const uploadMiddleware = require("../middleware/s3_v3.upload.cjs");

const router = express.Router();

router.post("/id-card-upload", uploadMiddleware, (req, res) => {
  if (req.file) {
    res.status(200).send({
      result: 1,
      message: `File uploaded successfully: ${req.file.originalname}`,
    });
  } else {
    res.status(400).send({
      result: 0,
      message: "File upload failed",
    });
  }
});

module.exports = router;
