const express = require("express");
const router = express.Router();

const evm = require("../services/evm.service");
const risk = require("../services/risk.service");
const explorer = require("../utils/explorer");

router.post("/", async (req, res) => {
  try {
    const { chain, targetAddress } = req.body;

    // Validation
    if (!chain || !targetAddress) {
      return res.status(400).json({
        error: "Missing chain or targetAddress"
      });
    }

    // Demo scope: ETH only
    if (chain !== "eth") {
      return res.json({
        riskScore: 0,
        riskLevel: "Low",
        reasons: ["Chain not supported in demo"],
        walletMetrics: {},
        explorerLink: explorer(chain, targetAddress)
      });
    }

    // 🔥 RPC-based wallet metrics (GUARANTEED DATA)
    const metrics = await evm.buildWalletMetricsRPC(
      process.env.ETH_RPC,
      targetAddress
    );

    // AML heuristic scoring
    const scored = risk.score(metrics);

    return res.json({
      ...scored,
      walletMetrics: metrics,
      explorerLink: explorer(chain, targetAddress)
    });

  } catch (err) {
    console.error("Check API error:", err.message);
    return res.status(500).json({
      error: "Failed to evaluate wallet risk"
    });
  }
});

module.exports = router;
