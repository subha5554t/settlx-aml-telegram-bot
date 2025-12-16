module.exports.score = (activity) => {
  let score = 20;
  const reasons = [];

  if (activity[0]?.type === "fallback") {
    score += 20;
    reasons.push("Limited RPC visibility");
  }

  return {
    riskScore: score,
    riskLevel: score > 60 ? "High" : score > 30 ? "Medium" : "Low",
    reasons
  };
};
