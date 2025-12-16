const express = require("express");
const router = express.Router();
const telegramService = require("../services/telegram.service");

router.post("/webhook", async (req, res) => {
  try {
    console.log("🔥 Telegram webhook hit");
    await telegramService.handle(req.body);
  } catch (err) {
    console.error("❌ Telegram handler error:", err.message);
  }

  res.send("ok");
});

module.exports = router;
