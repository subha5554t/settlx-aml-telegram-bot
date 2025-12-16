const { Connection, PublicKey } = require("@solana/web3.js");
const conn = new Connection(process.env.SOL_RPC);

module.exports.getRecentActivity = async address => {
  const sigs = await conn.getSignaturesForAddress(new PublicKey(address), {
    limit: 20
  });
  return sigs.map(s => ({
    hash: s.signature,
    timestamp: s.blockTime || 0,
    amount: 0
  }));
};
