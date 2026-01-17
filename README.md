SETTL X AML Telegram Bot

A demo AML (Anti-Money Laundering) Telegram bot that performs heuristic wallet risk analysis and on-chain activity tracking using free blockchain data.

Built for engineering evaluation and system design discussion.

Features
🔍 Wallet Risk Check (/check)

Risk score (0–100)

Risk level (Low / Medium / High)

Reason-based explanation

Explorer link

👀 Wallet Tracking (/tracking)

Track wallets for native ETH transfers

Receive Telegram alerts on activity

Supports:

Add wallet

View tracked wallets

Remove wallet

Pause wallet tracking

Supported Chains

Ethereum (supported)

Base, Avalanche, Solana (planned)

Tracking currently focuses on native ETH transfers only.
ERC-20 and swap tracking can be added later.

Telegram Commands
Core
/start
/menu
/help

Wallet Check
/check eth <wallet_address>

Tracking
/tracking add-new
/tracking view-tracked
/tracking remove <label>
/tracking pause <label>

AML Risk Logic

Uses simple heuristic rules, such as:

Wallet age

Transaction count

Recent activity

Inflow vs outflow behavior

Inactive wallets

Scores are tuned for demo purposes, not real AML enforcement.

Architecture (High Level)
Telegram → Express API → Services → SQLite DB
                       → Polling Worker → Alerts

Tech Stack

Node.js

Express

SQLite

ethers.js

Telegram Bot API

Environment Variables
TELEGRAM_BOT_TOKEN=your_bot_token
ETHERSCAN_API_KEY=your_etherscan_key
BASE_URL=http://localhost:3000

Run Locally
npm install
node src/server.js

Known Limitations

No ERC-20 or swap decoding

Free API rate limits

Demo-only AML logic

Author

Subhadip Mahanty
GitHub: https://github.com/subha5554t

Telegram Bot: https://t.me/SettlX_AML_Bot

Disclaimer

This project is a demo AML system and should not be used for real-world compliance.
