import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
  region: process.env.B2_REGION || "us-west-004",
  endpoint: process.env.B2_ENDPOINT ? (process.env.B2_ENDPOINT.startsWith('http') ? process.env.B2_ENDPOINT : `https://${process.env.B2_ENDPOINT}`) : "https://s3.us-west-004.backblazeb2.com",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID || "",
    secretAccessKey: process.env.B2_APP_KEY || "",
  }
});
const B2_BUCKET_NAME = process.env.B2_BUCKET_NAME || "";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!B2_BUCKET_NAME || !process.env.B2_KEY_ID) {
        return res.status(500).json({ error: "Backblaze B2 is not configured" });
      }

      const fileExtension = req.file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: B2_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3Client.send(command);

      // Construct public URL
      const endpoint = process.env.B2_ENDPOINT ? (process.env.B2_ENDPOINT.startsWith('http') ? process.env.B2_ENDPOINT : `https://${process.env.B2_ENDPOINT}`) : "https://s3.us-west-004.backblazeb2.com";
      const secure_url = `${endpoint}/${B2_BUCKET_NAME}/${fileName}`;

      res.json({ secure_url, delete_token: fileName });
    } catch (e: any) {
      console.error("Upload error", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/upload/:token", async (req, res) => {
    try {
      if (!B2_BUCKET_NAME || !process.env.B2_KEY_ID) {
        return res.status(500).json({ error: "Backblaze B2 is not configured" });
      }

      const command = new DeleteObjectCommand({
        Bucket: B2_BUCKET_NAME,
        Key: req.params.token,
      });
      await s3Client.send(command);
      res.json({ success: true });
    } catch (e: any) {
      console.error("Delete error", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: req.body.prompt || "Hello",
      });
      res.json({ reply: response.text });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
