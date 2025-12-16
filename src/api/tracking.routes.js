const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add-new", async (req, res) => {
  const { userId, chain, address, label, min_amount } = req.body;

  await db.run(
    `INSERT INTO tracked_addresses 
     (user_id, chain, address, label, min_amount, last_seen_cursor)
     VALUES (?,?,?,?,?,?)`,
    [userId, chain, address, label, min_amount, "0"]
  );

  res.json({ status: "tracking started" });
});

module.exports = router;
