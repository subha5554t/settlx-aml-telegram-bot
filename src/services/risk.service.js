/**
 * Calculate AML-style risk score based on wallet behavior
 * Uses real wallet metrics (not dummy logic)
 */
module.exports.score = (metrics) => {
  let score = 0;
  const reasons = [];

  // 1. Wallet age risk
  if (metrics.walletAgeDays < 7) {
    score += 25;
    reasons.push("New wallet");
  } else if (metrics.walletAgeDays < 30) {
    score += 10;
    reasons.push("Relatively new wallet");
  }

  // 2. Low historical activity
  if (metrics.txCount < 10) {
    score += 10;
    reasons.push("Low historical transaction count");
  }

  // 3. High recent activity
  if (metrics.recentTxCount > 10) {
    score += 20;
    reasons.push("High recent transaction velocity");
  }

  // 4. Inflow vs outflow imbalance
  if (
    metrics.inflow > metrics.outflow * 3 &&
    metrics.inflow > 1
  ) {
    score += 25;
    reasons.push("Large inflow imbalance");
  }

  // Cap score
  score = Math.min(score, 100);

  return {
    riskScore: score,
    riskLevel:
      score >= 60 ? "High" :
      score >= 30 ? "Medium" :
      "Low",
    reasons
  };
};
