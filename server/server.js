const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Simulate sentiment analysis
const analyzeSentiment = (text) => {
  const sentiments = ["positive", "neutral", "negative"];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
};

// API endpoint for analyzing text
app.post("/api/analyze", (req, res) => {
  const { text } = req.body;
  const result = analyzeSentiment(text);
  res.json({ result });
});

// API endpoint for saving analysis
app.post("/api/save-analysis", (req, res) => {
  const { user, text, result } = req.body;
  const data = { text, result };
  const filePath = path.join(__dirname, "analysisData.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    let analysisData = {};

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
