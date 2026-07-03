import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/youtube", async (req, res) => {
    try {
      const { endpoint, params } = req.body;
      if (!process.env.YOUTUBE) {
        return res.status(500).json({ error: "YOUTUBE api key is not configured" });
      }

      const queryParams = new URLSearchParams({
        ...params,
        key: process.env.YOUTUBE
      });

      const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${queryParams.toString()}`;
      
      const ytRes = await fetch(url);
      const data = await ytRes.json();
      
      if (!ytRes.ok) {
         return res.status(ytRes.status).json(data);
      }
      
      res.json(data);
    } catch (error: any) {
      console.error("Error calling YouTube API:", error);
      res.status(500).json({ error: error.message || "Failed to fetch from YouTube" });
    }
  });

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      let response;
      let retries = 5;
      let delay = 1000;
      let currentModel = "gemini-3.5-flash";
      
      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: currentModel,
            contents: prompt,
          });
          break;
        } catch (error: any) {
          const isUnavailable = error.status === 503 || 
                                error.status === 'UNAVAILABLE' || 
                                (error.error && error.error.code === 503) ||
                                (error.message && error.message.includes('503'));
          
          if (isUnavailable && retries > 1) {
            retries--;
            if (retries === 3) {
                currentModel = "gemini-2.5-flash"; // Fallback to an older model if still failing
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 1.5; // Exponential backoff
          } else {
            throw error;
          }
        }
      }

      if (!response) {
        throw new Error("Failed to generate content after retries");
      }

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: error.message || "Failed to generate content" });
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
