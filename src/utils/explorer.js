const chains = require("../config/chains");
module.exports = (chain, addr) => chains[chain].explorer + addr;
