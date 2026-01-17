/**
 * Calculate AML-style risk score based on wallet behavior
 * Tuned for demo visibility while remaining explainable
 */
module.exports.score = (metrics) => {
  let score = 0;
  const reasons = [];

  // 1. Wallet age
  if (metrics.walletAgeDays === 0) {
    score += 30;
    reasons.push("Inactive or empty wallet");
  } else if (metrics.walletAgeDays < 30) {
    score += 20;
    reasons.push("Relatively new wallet");
  } else {
    score += 10;
    reasons.push("Old wallet");
  }

  // 2. Transaction history
  if (metrics.txCount === 0) {
    score += 20;
    reasons.push("No transaction history");
  } else if (metrics.txCount < 20) {
    score += 15;
    reasons.push("Low transaction count");
  } else {
    score += 5;
    reasons.push("High transaction count");
  }

  // 3. Recent activity (24h)
  if (metrics.recentTxCount > 0) {
    score += 15;
    reasons.push("Recent on-chain activity");
  }

  // 4. Flow behavior
  if (metrics.inflow > metrics.outflow) {
    score += 10;
    reasons.push("Net inflow detected");
  }

  // Cap
  score = Math.min(score, 100);

  return {
    riskScore: score,
    riskLevel:
      score >= 70 ? "High" :
      score >= 40 ? "Medium" :
      "Low",
    reasons
  };
};
