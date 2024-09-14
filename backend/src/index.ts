import express, { Request, Response, Application } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import bodyParser from "body-parser";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = 8000;
const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post(
  "/upload-to-s3",
  upload.single("media"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file;
    const fileName = `${uuidv4()}-${path.basename(file.originalname)}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      const data = await s3Client.send(command);
      res.status(200).json({
        success: true,
        fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      });
    } catch (err: any) {
      console.error("Error uploading to S3:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
