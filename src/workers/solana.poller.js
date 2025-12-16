const cron = require("node-cron");
const { Connection, PublicKey } = require("@solana/web3.js");
const db = require("../db");

const conn = new Connection(process.env.SOL_RPC);

cron.schedule("*/5 * * * *", async () => {
  const tracked = await db.all(
    "SELECT * FROM tracked_addresses WHERE chain='sol' AND is_active=1"
  );

  for (const t of tracked) {
    const sigs = await conn.getSignaturesForAddress(
      new PublicKey(t.address),
      { limit: 10 }
    );

    for (const s of sigs) {
      await db.run(
        `INSERT OR IGNORE INTO alert_events
         (tracked_address_id, chain, tx_hash_or_sig, timestamp)
         VALUES (?,?,?,?)`,
        [t.id, "sol", s.signature, s.blockTime]
      );
    }

    if (sigs[0])
      await db.run(
        "UPDATE tracked_addresses SET last_seen_cursor=? WHERE id=?",
        [sigs[0].signature, t.id]
      );
  }
});
