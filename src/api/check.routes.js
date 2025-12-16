const express = require("express");
const router = express.Router();
const evm = require("../services/evm.service");
const risk = require("../services/risk.service");
const explorer = require("../utils/explorer");

router.post("/", async (req, res) => {
  const { chain, targetAddress } = req.body;

  const activity = await evm.getRecentActivity(
    process.env[`${chain.toUpperCase()}_RPC`],
    targetAddress
  );

  const scored = risk.score(activity);

  res.json({
    ...scored,
    recentActivity: activity,
    explorerLink: explorer(chain, targetAddress)
  });
});

module.exports = router;
