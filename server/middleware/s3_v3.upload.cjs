const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      result: 0,
      message: "No file uploaded",
    });
  }

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.originalname,
    Body: fs.createReadStream(req.file.path),
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    await s3Client.send(command);
    fs.unlinkSync(req.file.path);

    // Invoke Lambda function
    const lambdaCommand = new InvokeCommand({
      FunctionName: `${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
      Payload: JSON.stringify({ Records: [{ s3: { bucket: { name: process.env.AWS_BUCKET_NAME }, object: { key: req.file.originalname } } }] }),
    });

    const lambdaResponse = await lambdaClient.send(lambdaCommand);
    const payload = JSON.parse(Buffer.from(lambdaResponse.Payload).toString());

    if (payload.statusCode === 200) {
      const extractedData = JSON.parse(payload.body).data;
      res.status(200).send({
        result: 1,
        message: `File uploaded successfully: ${req.file.originalname}`,
        data: extractedData,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.originalname}`
      });
    } else {
      res.status(500).send({
        result: 0,
        message: "Error processing file with Lambda",
      });
    }
  } catch (err) {
    console.error("Error uploading to S3 or invoking Lambda:", err);
    res.status(500).send({
      result: 0,
      message: "Error uploading to S3 or invoking Lambda",
      error: err.message,
    });
  }
};

module.exports = [upload.single("file"), uploadToS3];
