const express = require("express");
const router = express.Router();

const evm = require("../services/evm.service");
const risk = require("../services/risk.service");
const explorer = require("../utils/explorer");

router.post("/", async (req, res) => {
  try {
    const { chain, targetAddress } = req.body;

    // Basic validation
    if (!chain || !targetAddress) {
      return res.status(400).json({ error: "Missing chain or targetAddress" });
    }

    // For now, we improve ETH-based chains only (acceptable scope)
    if (chain !== "eth") {
      return res.json({
        riskScore: 0,
        riskLevel: "Low",
        reasons: ["Limited support for this chain in demo"],
        recentActivity: [],
        explorerLink: explorer(chain, targetAddress)
      });
    }

    // 1. Fetch wallet transactions (FREE Etherscan API)
    const txs = await evm.getWalletTransactions(targetAddress);

    // 2. Build wallet-level metrics
    const metrics = evm.buildWalletMetrics(txs, targetAddress);

    // 3. Score AML risk using wallet behavior
    const scored = risk.score(metrics);

    // 4. Respond with meaningful data
    res.json({
      ...scored,
      walletMetrics: metrics,
      explorerLink: explorer(chain, targetAddress)
    });

  } catch (err) {
    console.error("Check API error:", err.message);
    res.status(500).json({
      error: "Failed to evaluate wallet risk"
    });
  }
});

module.exports = router;
