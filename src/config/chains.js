module.exports = {
  eth: {
    name: "Ethereum",
    rpc: process.env.ETH_RPC,
    explorerAddress: "https://etherscan.io/address/",
    explorerTx: "https://etherscan.io/tx/"
  },
  base: {
    name: "Base",
    rpc: process.env.BASE_RPC,
    explorerAddress: "https://basescan.org/address/",
    explorerTx: "https://basescan.org/tx/"
  },
  avax: {
    name: "Avalanche",
    rpc: process.env.AVAX_RPC,
    explorerAddress: "https://snowtrace.io/address/",
    explorerTx: "https://snowtrace.io/tx/"
  },
  sol: {
    name: "Solana",
    rpc: process.env.SOL_RPC,
    explorerAddress: "https://solscan.io/account/",
    explorerTx: "https://solscan.io/tx/"
  }
};
