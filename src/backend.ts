import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "hono/adapter";

const getEnv = (c: any): any => {
  let e: any = {};
  try {
    e = env(c) || {};
  } catch (err) {}
  
  // Create a proxy to check Hono env first, then process.env
  return new Proxy({}, {
    get(target, prop) {
      if (typeof prop === 'string') {
        // Cloudflare Pages specific
        if (c && c.env && c.env[prop] !== undefined) return c.env[prop];
        
        // Hono adapter
        if (e && e[prop] !== undefined) return e[prop];
        
        // Node.js process.env
        if (typeof process !== 'undefined' && process.env && process.env[prop] !== undefined) return process.env[prop];

        // Vite / client-side import.meta.env (just in case)
        try {
          // @ts-ignore
          if (import.meta && import.meta.env && import.meta.env[prop] !== undefined) return import.meta.env[prop];
        } catch (err) {}
      }
      return undefined;
    }
  });
};

const api = new Hono().basePath('/api');

const getS3Client = (e: any) => {
  let endpoint = e.S3_ENDPOINT ? (e.S3_ENDPOINT.startsWith('http') ? e.S3_ENDPOINT : `https://${e.S3_ENDPOINT}`) : "";
  const bucketName = e.S3_BUCKET_NAME || e.B2_BUCKET_NAME || "";
  
  // Clean endpoint: if it ends with /<bucketName>, remove it
  if (endpoint && bucketName && endpoint.endsWith(`/${bucketName}`)) {
    endpoint = endpoint.substring(0, endpoint.length - bucketName.length - 1);
  }
  // also strip trailing slash
  endpoint = endpoint.replace(/\/$/, "");

  return new S3Client({
    region: e.S3_REGION || "auto",
    endpoint: endpoint,
    credentials: {
      accessKeyId: e.S3_ACCESS_KEY_ID || e.B2_KEY_ID || "",
      secretAccessKey: e.S3_SECRET_ACCESS_KEY || e.S3_SECRET_ACCESS || e.B2_APP_KEY || "",
    }
  });
};

api.get("/health", (c) => c.json({ status: "ok" }));

api.post("/upload", async (c) => {
  try {
    const e = getEnv(c);
    const bucketName = e.S3_BUCKET_NAME || e.B2_BUCKET_NAME || "";
    const endpointStr = e.S3_ENDPOINT || e.B2_ENDPOINT || "";
    const accessKeyId = e.S3_ACCESS_KEY_ID || e.B2_KEY_ID || "";
    const secretAccessKey = e.S3_SECRET_ACCESS_KEY || e.S3_SECRET_ACCESS || e.B2_APP_KEY || "";
    
    let formData;
    try {
      formData = await c.req.formData();
    } catch (err: any) {
      console.error("FormData parse error", err);
      return c.json({ error: "Failed to parse form data" }, 400);
    }
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file uploaded" }, 400);
    }

    if (!bucketName || !endpointStr || !accessKeyId || !secretAccessKey) {
      const missing = [];
      if (!bucketName) missing.push("S3_BUCKET_NAME");
      if (!endpointStr) missing.push("S3_ENDPOINT");
      if (!accessKeyId) missing.push("S3_ACCESS_KEY_ID");
      if (!secretAccessKey) missing.push("S3_SECRET_ACCESS_KEY");
      
      return c.json({ error: `Cloudflare R2 / S3 storage is not configured. Missing: ${missing.join(", ")}` }, 500);
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    });

    const s3Client = getS3Client(e);
    await s3Client.send(command);

    let secure_url;
    if (e.S3_PUBLIC_DOMAIN) {
      const pubDomain = e.S3_PUBLIC_DOMAIN.startsWith('http') ? e.S3_PUBLIC_DOMAIN : `https://${e.S3_PUBLIC_DOMAIN}`;
      const cleanPubDomain = pubDomain.replace(/\/$/, "");
      secure_url = `${cleanPubDomain}/${fileName}`;
    } else {
      const endpoint = endpointStr.startsWith('http') ? endpointStr : `https://${endpointStr}`;
      const cleanEndpoint = endpoint.replace(/\/$/, "");
      secure_url = `${cleanEndpoint}/${bucketName}/${fileName}`;
    }

    console.log("Uploaded successfully, returning URL:", secure_url);
    return c.json({ secure_url, delete_token: fileName });
  } catch (err: any) {
    console.error("Upload error", err);
    return c.json({ error: err.message }, 500);
  }
});

api.delete("/upload/:token", async (c) => {
  try {
    const e = getEnv(c);
    const bucketName = e.S3_BUCKET_NAME || e.B2_BUCKET_NAME || "";
    const endpointStr = e.S3_ENDPOINT || e.B2_ENDPOINT || "";
    const accessKeyId = e.S3_ACCESS_KEY_ID || e.B2_KEY_ID || "";
    const secretAccessKey = e.S3_SECRET_ACCESS_KEY || e.S3_SECRET_ACCESS || e.B2_APP_KEY || "";
    
    if (!bucketName || !endpointStr || !accessKeyId || !secretAccessKey) {
      const missing = [];
      if (!bucketName) missing.push("S3_BUCKET_NAME");
      if (!endpointStr) missing.push("S3_ENDPOINT");
      if (!accessKeyId) missing.push("S3_ACCESS_KEY_ID");
      if (!secretAccessKey) missing.push("S3_SECRET_ACCESS_KEY");
      return c.json({ error: `Cloudflare R2 / S3 storage is not configured. Missing: ${missing.join(", ")}` }, 500);
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
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
    const e = getEnv(c);
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
