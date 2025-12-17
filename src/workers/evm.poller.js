require("dotenv").config();
const { ethers } = require("ethers");
const db = require("../db");
const telegram = require("../services/telegram.service");

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);

setInterval(async () => {
  try {
    const tracked = await db.getActive("eth");
    const latestBlock = await provider.getBlockNumber();

    for (const t of tracked) {
      // Initialize cursor
      if (!t.last_seen_cursor) {
        await db.updateCursor(t.id, latestBlock);
        continue;
      }

      for (let b = t.last_seen_cursor + 1; b <= latestBlock; b++) {
        const block = await provider.getBlockWithTransactions(b);

        for (const tx of block.transactions) {
          if (
            tx.to?.toLowerCase() === t.address.toLowerCase() ||
            tx.from?.toLowerCase() === t.address.toLowerCase()
          ) {
            const ethAmount = Number(ethers.formatEther(tx.value));

            // Ignore dust & respect min_amount
            if (ethAmount < t.min_amount) continue;

            // Save for dedupe
            const saved = await db.saveAlert(t.id, tx.hash);
            if (!saved) continue;

            // Determine direction
            const direction =
              tx.to?.toLowerCase() === t.address.toLowerCase()
                ? "Incoming"
                : "Outgoing";

            // 🔥 PUSH TO TELEGRAM UI (THIS WAS MISSING)
            await telegram.send(
              t.telegram_user_id,
              `🚨 ETH Transfer Detected

Wallet: ${t.label}
Direction: ${direction}
Amount: ${ethAmount} ETH
Tx: https://etherscan.io/tx/${tx.hash}`
            );
          }
        }
      }

      // Update cursor after processing
      await db.updateCursor(t.id, latestBlock);
    }
  } catch (err) {
    console.error("EVM poller error:", err.message);
  }
}, 60000);
