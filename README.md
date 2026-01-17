🚀 SETTL X AML Telegram Bot

A Telegram-based AML (Anti-Money Laundering) demo bot that performs wallet risk analysis and on-chain activity tracking using free blockchain data and heuristic logic.

Built for engineering evaluation, backend assessment, and system design discussion.

🎯 Project Objective

Provide a quick AML-style risk summary for blockchain wallets

Enable wallet tracking with Telegram alerts

Demonstrate clean backend architecture, polling, and deduplication

Avoid paid AML services (demo-focused, transparent logic)

✨ Key Features
🔍 Wallet Risk Analysis (/check)

Generates:

Risk score (0–100)

Risk level (Low / Medium / High)

Clear reasons for the score

Blockchain explorer link

Uses heuristic-based AML logic

Command

/check eth <wallet_address>

👀 Wallet Tracking & Alerts (/tracking)

Track wallets and receive Telegram alerts when new on-chain activity occurs.

Supported actions:

➕ Add a wallet to tracking

📄 View all tracked wallets

🗑️ Remove a wallet (soft deactivation)

⏸️ Pause wallet tracking

Commands

/tracking add-new
/tracking view-tracked
/tracking remove <label>
/tracking pause <label>


Tracking currently focuses on native ETH transfers to keep the system reliable and lightweight.

⛓️ Supported Networks

✅ Ethereum (fully supported)

🟡 Base (planned)

🟡 Avalanche (planned)

🟡 Solana (planned)

🧠 AML Risk Scoring Logic (Heuristic)

The bot uses simple, explainable heuristics, including:

Wallet age (new vs old)

Transaction history size

Recent on-chain activity

Inflow vs outflow behavior

Inactive or low-activity wallets

Scores are demo-oriented and not intended for real regulatory AML enforcement.

🏗️ System Architecture (High Level)
Telegram Bot
   ↓
Express API
   ↓
Services (Risk, EVM, Telegram)
   ↓
SQLite Database
   ↓
Polling Worker → Telegram Alerts

🛠️ Tech Stack

Node.js

Express

SQLite

ethers.js

Axios

Telegram Bot API

Etherscan API (Free Tier)

⚙️ Environment Configuration

Create a .env file:

TELEGRAM_BOT_TOKEN=your_bot_token
ETHERSCAN_API_KEY=your_etherscan_key
BASE_URL=http://localhost:3000

▶️ Run Locally
npm install
node src/server.js

⚠️ Known Limitations

ERC-20 tokens and swaps are not decoded

Free API rate limits apply

Demo-focused AML logic only

Not suitable for real compliance use

👤 Author

Subhadip Mahanty
Blockchain & Backend Developer

GitHub: https://github.com/subha5554t

Telegram Bot: https://t.me/SettlX_AML_Bot

📄 Disclaimer

This is a demo AML project built for learning and evaluation purposes only.
It must not be used for real-world financial compliance.
