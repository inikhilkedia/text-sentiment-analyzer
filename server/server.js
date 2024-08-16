const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3001;

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

  // Store the text and result in a JSON file
  const data = { text, result };
  const filePath = path.join(__dirname, "analysisData.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    let analysisData = [];
    if (!err && fileData) {
      analysisData = JSON.parse(fileData);
    }
    analysisData.push(data);

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
        res.json({ result });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
