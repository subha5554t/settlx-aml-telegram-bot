const { ethers } = require("ethers");

module.exports.getRecentActivity = async (rpcUrl, address) => {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const block = await provider.getBlockNumber();
    return [{ type: "rpc", block }];
  } catch {
    return [{ type: "fallback", note: "RPC unavailable" }];
  }
};
