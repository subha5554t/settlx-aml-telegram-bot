module.exports = async (db, trackedId, hash) => {
  const rows = await db.all(
    "SELECT 1 FROM alert_events WHERE tracked_address_id=? AND tx_hash_or_sig=?",
    [trackedId, hash]
  );
  return rows.length > 0;
};
