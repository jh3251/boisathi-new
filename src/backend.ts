import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "hono/adapter";

const api = new Hono().basePath('/api');

const getS3Client = (e: any) => {
  return new S3Client({
    region: e.B2_REGION || "us-west-004",
    endpoint: e.B2_ENDPOINT ? (e.B2_ENDPOINT.startsWith('http') ? e.B2_ENDPOINT : `https://${e.B2_ENDPOINT}`) : "https://s3.us-west-004.backblazeb2.com",
    credentials: {
      accessKeyId: e.B2_KEY_ID || "",
      secretAccessKey: e.B2_APP_KEY || "",
    }
  });
};

api.get("/health", (c) => c.json({ status: "ok" }));

api.post("/upload", async (c) => {
  try {
    const e = env<any>(c);
    const B2_BUCKET_NAME = e.B2_BUCKET_NAME || "";
    
    // Using native Web API to parse form data (natively supported and optimized in C++ by Cloudflare)
    const formData = await c.req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file uploaded" }, 400);
    }

    if (!B2_BUCKET_NAME || !e.B2_KEY_ID || !e.B2_APP_KEY) {
      const missing = [];
      if (!B2_BUCKET_NAME) missing.push("B2_BUCKET_NAME");
      if (!e.B2_KEY_ID) missing.push("B2_KEY_ID");
      if (!e.B2_APP_KEY) missing.push("B2_APP_KEY");
      return c.json({ error: `Backblaze B2 is not configured. Missing: ${missing.join(", ")}` }, 500);
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: B2_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    });

    const s3Client = getS3Client(e);
    await s3Client.send(command);

    const endpoint = e.B2_ENDPOINT ? (e.B2_ENDPOINT.startsWith('http') ? e.B2_ENDPOINT : `https://${e.B2_ENDPOINT}`) : "https://s3.us-west-004.backblazeb2.com";
    const secure_url = `${endpoint}/${B2_BUCKET_NAME}/${fileName}`;

    return c.json({ secure_url, delete_token: fileName });
  } catch (err: any) {
    console.error("Upload error", err);
    return c.json({ error: err.message }, 500);
  }
});

api.delete("/upload/:token", async (c) => {
  try {
    const e = env<any>(c);
    const B2_BUCKET_NAME = e.B2_BUCKET_NAME || "";
    
    if (!B2_BUCKET_NAME || !e.B2_KEY_ID || !e.B2_APP_KEY) {
      const missing = [];
      if (!B2_BUCKET_NAME) missing.push("B2_BUCKET_NAME");
      if (!e.B2_KEY_ID) missing.push("B2_KEY_ID");
      if (!e.B2_APP_KEY) missing.push("B2_APP_KEY");
      return c.json({ error: `Backblaze B2 is not configured. Missing: ${missing.join(", ")}` }, 500);
    }

    const command = new DeleteObjectCommand({
      Bucket: B2_BUCKET_NAME,
      Key: c.req.param("token"),
    });
    
    const s3Client = getS3Client(e);
    await s3Client.send(command);
    
    return c.json({ success: true });
  } catch (err: any) {
    console.error("Delete error", err);
    return c.json({ error: err.message }, 500);
  }
});

api.post("/chat", async (c) => {
  try {
    const e = env<any>(c);
    const body = await c.req.json();
    const ai = new GoogleGenAI({
      apiKey: e.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: body.prompt || "Hello",
    });
    return c.json({ reply: response.text });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Export the Hono app. 
// Cloudflare Workers will use this export natively to handle requests.
export default api;
