import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: `${__dirname}/../.env` });

import express from "express";
const app = express();

app.use(express.json());

import("./routes/app.routes.cjs").then((routes) => {
  app.use("/vodth/api/v1", routes.default);
});

app.listen(3000, function () {
  console.log("Server is running on Port", 3000);
});
