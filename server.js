const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("🟢 ScanCheck API is running");
});

const badWords = [
  "free money",
  "bitcoin",
  "verify your account",
  "urgent action",
  "password",
  "win prize",
  "click here now",
  "claim reward"
];

app.post("/scan", (req, res) => {
  const text = (req.body?.text || "").toLowerCase();
  const url = req.body?.url || "";

  let risk = "safe";
  let reason = null;

  for (const w of badWords) {
    if (text.includes(w)) {
      risk = "danger";
      reason = w;
      break;
    }
  }

  res.json({
    risk,
    reason,
    url,
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("ScanCheck API running on port", PORT);
});
