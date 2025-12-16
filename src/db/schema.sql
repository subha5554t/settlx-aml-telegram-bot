CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS tracked_addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  chain TEXT,
  address TEXT,
  label TEXT,
  min_amount REAL,
  is_active INTEGER DEFAULT 1,
  last_seen_cursor TEXT
);

CREATE TABLE IF NOT EXISTS alert_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracked_address_id INTEGER,
  tx_hash_or_sig TEXT UNIQUE,
  timestamp INTEGER
);
