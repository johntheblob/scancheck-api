const express = require("express");
const cors = require("cors");

const app = express();

// CORS fix (VIKTIGT för Firefox)
app.use(cors({
  origin: "*",
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("🟢 ScanCheck API is running");
});

// Simple detection engine
const badWords = [
  "free money",
  "bitcoin",
  "verify your account",
  "urgent action",
  "password",
  "win prize",
  "click here now"
];

app.post("/scan", (req, res) => {
  const text = (req.body?.text || "").toLowerCase();

  let risk = "safe";
  let reason = null;

  for (const word of badWords) {
    if (text.includes(word)) {
      risk = "danger";
      reason = word;
      break;
    }
  }

  res.json({
    risk,
    reason,
    url: req.body?.url || null,
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("ScanCheck API running on port", PORT);
});
