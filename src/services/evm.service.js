const { ethers } = require("ethers");
const axios = require("axios");

/**
 * Fetch wallet balance using public RPC
 */
async function getWalletBalance(rpcUrl, address) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const balanceWei = await provider.getBalance(address);
  return Number(ethers.formatEther(balanceWei));
}

/**
 * Fetch full transaction history using FREE Etherscan API
 * This is acceptable and commonly used in demos/interviews
 */
async function getWalletTransactions(address) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);

  if (res.data.status !== "1") {
    return [];
  }

  return res.data.result;
}

/**
 * Build wallet metrics required for AML-style heuristics
 */
function buildWalletMetrics(txs) {
  if (!txs.length) {
    return {
      walletAgeDays: 0,
      txCount: 0,
      recentTxCount: 0,
      inflow: 0,
      outflow: 0
    };
  }

  const now = Date.now() / 1000;
  const firstTx = txs[0];
  const walletAgeDays = (now - firstTx.timeStamp) / 86400;

  const recentTxs = txs.filter(
    tx => now - tx.timeStamp < 86400 // last 24 hours
  );

  let inflow = 0;
  let outflow = 0;

  for (const tx of recentTxs) {
    const eth = Number(tx.value) / 1e18;
    if (eth === 0) continue;

    if (tx.to && tx.to.toLowerCase() === tx.to) {
      inflow += eth;
    } else {
      outflow += eth;
    }
  }

  return {
    walletAgeDays: Math.floor(walletAgeDays),
    txCount: txs.length,
    recentTxCount: recentTxs.length,
    inflow,
    outflow
  };
}

module.exports = {
  getWalletBalance,
  getWalletTransactions,
  buildWalletMetrics
};
