const { isAddress } = require("ethers");

module.exports = (chain, addr) => {
  if (chain === "sol") {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
  }
  return isAddress(addr);
};
