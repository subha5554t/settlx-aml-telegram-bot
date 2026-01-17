🚀 SETTL X AML Telegram Bot

A Telegram-based AML demo bot that performs wallet risk analysis and on-chain activity tracking using free blockchain data and heuristic logic.

Designed for engineering evaluation, backend discussion, and system design review.

✨ What This Bot Does
🔍 Wallet Risk Analysis

Check the AML-style risk of any wallet:

Risk score (0–100)

Risk level (Low / Medium / High)

Clear reasons behind the score

Direct blockchain explorer link

Command:

/check eth <wallet_address>

👀 Wallet Tracking & Alerts

Track wallets and receive Telegram alerts on new on-chain activity.

You can:

Add wallets to track

View all tracked wallets

Remove a wallet

Pause tracking temporarily

Commands:

/tracking add-new
/tracking view-tracked
/tracking remove <label>
/tracking pause <label>


Tracking currently focuses on native ETH transfers for reliability and simplicity.

⛓️ Supported Networks

✅ Ethereum (fully supported)

🟡 Base, Avalanche, Solana (planned)

🧠 How AML Scoring Works

This bot uses transparent heuristic rules, not paid AML services.

Examples:

Wallet age (new vs old)

Transaction history size

Recent on-chain activity

Inflow vs outflow behavior

Inactive or empty wallets

Scores are demo-oriented and meant to show reasoning, not regulatory accuracy.

🏗️ System Overview
Telegram Bot
   ↓
Express API
   ↓
Services (Risk, EVM, Telegram)
   ↓
SQLite Database
   ↓
Polling Worker → Alerts

🛠️ Tech Stack

Node.js

Express

SQLite

ethers.js

Telegram Bot API

Etherscan API (free tier)

⚙️ Environment Setup

Create a .env file:

TELEGRAM_BOT_TOKEN=your_bot_token
ETHERSCAN_API_KEY=your_etherscan_key
BASE_URL=http://localhost:3000

▶️ Run Locally
npm install
node src/server.js

⚠️ Known Limitations

ERC-20 tokens and swaps not decoded

Free API rate limits

Demo-only AML logic

👤 Author

Subhadip Mahanty
Blockchain & Backend Developer

GitHub: https://github.com/subha5554t

Telegram Bot: https://t.me/SettlX_AML_Bot

📄 Disclaimer

This is a demo AML project for learning and evaluation purposes only.
Not intended for real-world compliance or regulatory use.
