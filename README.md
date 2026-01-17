SETTL X AML Telegram Bot

A demo AML (Anti-Money Laundering) Telegram bot that performs heuristic wallet risk analysis and on-chain activity tracking across multiple blockchains.

This project is built for engineering evaluation and system design discussion, not for production AML enforcement.

🚀 Features
🔍 Wallet Risk Check (/check)

Analyze a wallet using on-chain heuristics

Outputs:

Risk score (0–100)

Risk level (Low / Medium / High)

Clear reasons for the score

Explorer link

👀 Wallet Tracking (/tracking)

Track wallets for native ETH transfers

Receive Telegram alerts on activity

Supported actions:

Add wallet

View tracked wallets

Remove wallet (soft-deactivation)

⛓️ Supported Chains
Chain	Status
Ethereum	✅ Fully supported
Base	⚠️ Planned
Avalanche	⚠️ Planned
Solana	⚠️ Planned

Tracking currently focuses on native ETH transfers for reliability and simplicity.
ERC-20 tokens and swaps can be added as an enhancement.

🤖 Telegram Bot Commands
Core Commands
/start       → Welcome message
/menu        → Show available commands
/help        → Usage guide
/check       → Wallet AML risk check
/tracking    → Wallet tracking menu

/check Usage
/check eth <wallet_address>


Example:

/check eth 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

/tracking Commands
/tracking add-new
/tracking view-tracked
/tracking remove <label>

🧠 AML Risk Scoring (Heuristic)

This bot uses behavioral heuristics, not paid AML services.

Signals Used

Wallet age

Transaction history size

Recent activity (24h)

Inflow vs outflow behavior

Wallet inactivity

Example Reasons

New or inactive wallet

Low transaction history

Recent on-chain activity

Net inflow detected

Scores are tuned for demo visibility, not real AML thresholds.

🏗️ Architecture Overview
Telegram
   ↓ Webhook
Express API
   ↓
Services (EVM, Risk, Telegram)
   ↓
SQLite Database
   ↓
Background Worker (Polling)

🧩 Tech Stack

Node.js

Express

SQLite

ethers.js

Axios

Telegram Bot API

🗃️ Database Schema (SQLite)
users
field	description
id	Primary key
telegram_user_id	Unique Telegram ID
created_at	Timestamp
tracked_addresses
field	description
id	Primary key
user_id	FK → users
chain	eth / base / avax / sol
address	Wallet address
label	User-defined label
min_amount	Alert threshold
is_active	Soft delete flag
last_seen_cursor	Polling cursor
alert_events
field	description
tracked_address_id	FK
tx_hash_or_sig	Tx hash
timestamp	Event time
🔁 Tracking Engine (Polling)

Runs every 60 seconds

Fetches new blocks since last cursor

Matches from / to addresses

Applies:

Minimum amount filter

Deduplication

Sends Telegram alert

Updates cursor

Example Alert
🚨 ETH Transfer Detected

Wallet: MyWallet
Direction: Incoming
Amount: 1.25 ETH
Tx: https://etherscan.io/tx/0x...

💾 Data Persistence

Uses SQLite for simplicity

Soft-delete (is_active = 0) for tracking removal

Preserves alert history

No external DB dependency

⚙️ Environment Variables

Create a .env file:

TELEGRAM_BOT_TOKEN=your_bot_token
ETHERSCAN_API_KEY=your_etherscan_key
BASE_URL=http://localhost:3000


On Render or other platforms, environment variables must be added in the dashboard (not via .env).

▶️ Run Locally
npm install
node src/server.js

🧪 Example cURL (Check API)
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{
    "chain": "eth",
    "targetAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  }'

🚧 Known Limitations

ERC-20 tokens not decoded

Swaps not analyzed

Solana/Base/Avalanche tracking not enabled yet

Free Etherscan API rate limits apply

🔮 Future Improvements

ERC-20 & swap decoding

Multi-chain indexers

Address clustering

Risk history over time

Alert severity levels

UI buttons instead of text commands

🧠 Engineering Notes

No paid AML APIs used

Heuristic logic is transparent and explainable

Soft-delete used for safety

Polling chosen over WebSockets for reliability

Designed for evaluation & discussion

👤 Author

Subhadip Mahanty
B.Tech CSE
Blockchain & Backend Developer

GitHub: https://github.com/subha5554t

Telegram Bot: https://t.me/SettlX_AML_Bot
