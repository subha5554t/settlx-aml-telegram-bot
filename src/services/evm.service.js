const { ethers } = require("ethers");
const axios = require("axios");

/**
 * Fetch wallet transactions using ETHERSCAN API V2 (FREE)
 */
async function getWalletTransactions(address) {
  const url = "https://api.etherscan.io/v2/api";

  const res = await axios.get(url, {
    params: {
      chainId: 1, // Ethereum mainnet
      module: "account",
      action: "txlist",
      address,
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apikey: process.env.ETHERSCAN_API_KEY
    }
  });

  if (!res.data || res.data.status !== "1") {
    console.warn("Etherscan V2 returned no tx data:", res.data?.result);
    return [];
  }

  return res.data.result;
}

/**
 * Build wallet metrics required for AML-style heuristics
 */
function buildWalletMetrics(txs, targetAddress) {
  if (!txs || txs.length === 0) {
    return {
      walletAgeDays: 0,
      txCount: 0,
      recentTxCount: 0,
      inflow: 0,
      outflow: 0
    };
  }

  const wallet = targetAddress.toLowerCase();
  const now = Math.floor(Date.now() / 1000);

  const firstTxTime = Number(txs[0].timeStamp);
  const walletAgeDays = (now - firstTxTime) / 86400;

  const recentTxs = txs.filter(
    tx => now - Number(tx.timeStamp) <= 86400
  );

  let inflow = 0;
  let outflow = 0;

  for (const tx of recentTxs) {
    const eth = Number(tx.value) / 1e18;
    if (eth === 0) continue;

    if (tx.to && tx.to.toLowerCase() === wallet) {
      inflow += eth;
    }
    if (tx.from && tx.from.toLowerCase() === wallet) {
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
  getWalletTransactions,
  buildWalletMetrics
};
