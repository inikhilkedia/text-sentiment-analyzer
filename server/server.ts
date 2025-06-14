import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import crypto from "crypto";

interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  magnitude: number;
}

interface Analysis {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: string;
  user: string;
}

interface AnalysisDataStore {
  [user: string]: Analysis[];
}

interface AnalyzeRequest {
  text: string;
}

interface SaveAnalysisRequest {
  user: string;
  text: string;
  result: AnalysisResult;
}

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Simulate sentiment analysis
const analyzeSentiment = (text: string): AnalysisResult => {
  const sentiments = ["positive", "neutral", "negative"] as const;
  const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const score = Math.random() * 2 - 1; // Random score between -1 and 1
  const magnitude = Math.random(); // Random magnitude between 0 and 1

  return {
    sentiment,
    score,
    magnitude
  };
};

// API endpoint for analyzing text
app.post("/api/analyze", (req: Request<{}, {}, AnalyzeRequest>, res: Response) => {
  const { text } = req.body;
  const result = analyzeSentiment(text);
  res.json({ result });
});

// API endpoint for saving analysis
app.post("/api/save-analysis", (req: Request<{}, {}, SaveAnalysisRequest>, res: Response) => {
  const { user, text, result } = req.body;
  const data: Analysis = {
    id: crypto.randomUUID(),
    text,
    result,
    timestamp: new Date().toISOString(),
    user
  };
  const filePath = path.join(__dirname, "analysisData.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    let analysisData: AnalysisDataStore = {};

    if (err) {
      if (err.code === "ENOENT") {
        analysisData = {};
      } else {
        return res.status(500).json({ error: "Failed to read analysis data" });
      }
    } else {
      try {
        analysisData = JSON.parse(fileData);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return res.status(500).json({ error: "Failed to parse analysis data" });
      }
    }

    // If the user doesn't have any analyses yet, initialize their array
    if (!analysisData[user]) {
      analysisData[user] = [];
    }

    // Add the new analysis to the user's array
    analysisData[user].push(data);

    fs.writeFile(
      filePath,
      JSON.stringify(analysisData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Failed to save analysis data" });
        }
        res.json({ success: true });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 