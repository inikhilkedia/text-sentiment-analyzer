"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Simulate sentiment analysis
const analyzeSentiment = (_text) => {
    const sentiments = ["positive", "neutral", "negative"];
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
app.post("/api/analyze", (req, res) => {
    const { text } = req.body;
    const result = analyzeSentiment(text);
    res.json({ result });
});
// API endpoint for saving analysis
app.post("/api/save-analysis", (req, res) => {
    const { user, text, result } = req.body;
    const data = {
        id: crypto_1.default.randomUUID(),
        text,
        result,
        timestamp: new Date().toISOString(),
        user
    };
    const filePath = path_1.default.join(__dirname, "analysisData.json");
    fs_1.default.readFile(filePath, "utf8", (err, fileData) => {
        let analysisData = {};
        if (err) {
            if (err.code === "ENOENT") {
                analysisData = {};
            }
            else {
                return res.status(500).json({ error: "Failed to read analysis data" });
            }
        }
        else {
            try {
                analysisData = JSON.parse(fileData);
            }
            catch (parseErr) {
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
        fs_1.default.writeFile(filePath, JSON.stringify(analysisData, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                return res
                    .status(500)
                    .json({ error: "Failed to save analysis data" });
            }
            res.json({ success: true });
        });
    });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
