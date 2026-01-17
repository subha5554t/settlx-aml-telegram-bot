const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("aml.db");

db.exec(require("fs").readFileSync("src/db/schema.sql").toString());

module.exports = {
  db,

  getOrCreateUser(telegramId) {
    return new Promise((res) => {
      db.run(
        "INSERT OR IGNORE INTO users (telegram_user_id) VALUES (?)",
        [telegramId],
        () => {
          db.get(
            "SELECT id FROM users WHERE telegram_user_id=?",
            [telegramId],
            (_, row) => res(row.id)
          );
        }
      );
    });
  },

  addTracked(data) {
    return new Promise((res) => {
      db.run(
        `INSERT INTO tracked_addresses 
         (user_id, chain, address, label, min_amount) 
         VALUES (?,?,?,?,?)`,
        [
          data.user_id,
          data.chain,
          data.address,
          data.label,
          data.min_amount
        ],
        res
      );
    });
  },

  listTracked(user_id) {
    return new Promise((res) => {
      db.all(
        "SELECT * FROM tracked_addresses WHERE user_id=?",
        [user_id],
        (_, rows) => res(rows)
      );
    });
  },

  getActive(chain) {
    return new Promise((res) => {
      db.all(
        "SELECT * FROM tracked_addresses WHERE chain=? AND is_active=1",
        [chain],
        (_, rows) => res(rows)
      );
    });
  },

  saveAlert(tracked_id, hash) {
    return new Promise((res) => {
      db.run(
        "INSERT OR IGNORE INTO alert_events (tracked_address_id, tx_hash_or_sig, timestamp) VALUES (?,?,?)",
        [tracked_id, hash, Date.now()],
        res
      );
    });
  },

  removeTrackedByLabel(user_id, label) {
  return new Promise((res) => {
    db.run(
      `
      UPDATE tracked_addresses
      SET is_active = 0
      WHERE user_id = ?
        AND LOWER(label) = LOWER(?)
        AND is_active = 1
      `,
      [user_id, label],
      function () {
        // this.changes = number of rows updated
        res(this.changes > 0);
      }
    );
  });
},


  updateCursor(id, cursor) {
    db.run(
      "UPDATE tracked_addresses SET last_seen_cursor=? WHERE id=?",
      [cursor, id]
    );
  }
};
