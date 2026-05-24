const express = require("express");
const app = express();

app.use(express.json());

const badWords = [
  "free money",
  "bitcoin",
  "verify your account",
  "urgent action",
  "password"
];

app.post("/scan", (req, res) => {
  const { text } = req.body;

  let risk = "safe";
  let reason = null;

  for (const w of badWords) {
    if (text?.toLowerCase().includes(w)) {
      risk = "danger";
      reason = w;
      break;
    }
  }

  res.json({
    risk,
    reason
  });
});

app.listen(3000, () => console.log("ScanCheck API running"));
