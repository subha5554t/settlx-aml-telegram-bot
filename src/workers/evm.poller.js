require("dotenv").config();
const { ethers } = require("ethers");
const db = require("../db");

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);

setInterval(async () => {
  const tracked = await db.getActive("eth");
  const latest = await provider.getBlockNumber();

  for (const t of tracked) {
    if (!t.last_seen_cursor) {
      db.updateCursor(t.id, latest);
      continue;
    }

    for (let b = t.last_seen_cursor + 1; b <= latest; b++) {
      const block = await provider.getBlock(b);
      for (const tx of block.transactions) {
        if (tx.to === t.address || tx.from === t.address) {
          await db.saveAlert(t.id, tx.hash);
        }
      }
    }
    db.updateCursor(t.id, latest);
  }
}, 60000);
