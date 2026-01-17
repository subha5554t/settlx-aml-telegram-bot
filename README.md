# 🚀 SETTL X AML Telegram Bot

A **Telegram-based AML (Anti-Money Laundering) demo bot** that performs **wallet risk analysis** and **on-chain activity tracking** using **free blockchain data and heuristic logic**.

Built for **engineering evaluation, backend assessment, and system design discussion**.

---

## 🎯 Project Objective

- Provide a **quick AML-style risk summary** for blockchain wallets
- Enable **wallet tracking** with **Telegram alerts**
- Demonstrate **clean backend architecture**, polling, and deduplication
- Avoid paid AML services (demo-focused, transparent logic)

---

## ✨ Key Features

### 🔍 Wallet Risk Analysis (`/check`)
- Risk score (0–100)
- Risk level (Low / Medium / High)
- Clear reasons for the score
- Blockchain explorer link
- Heuristic-based AML logic

**Command**
/check eth <wallet_address>

yaml
Copy code

---

### 👀 Wallet Tracking & Alerts (`/tracking`)
Track wallets and receive **Telegram alerts** when new on-chain activity occurs.

**Actions**
- ➕ Add wallet
- 📄 View tracked wallets
- 🗑️ Remove wallet (soft deactivate)
- ⏸️ Pause tracking

**Commands**
/tracking add-new
/tracking view-tracked
/tracking remove <label>
/tracking pause <label>

yaml
Copy code

> Tracking currently focuses on **native ETH transfers** only.

---

## ⛓️ Supported Networks

- ✅ Ethereum
- 🟡 Base (planned)
- 🟡 Avalanche (planned)
- 🟡 Solana (planned)

---

## 🧠 AML Risk Scoring Logic (Heuristic)

- Wallet age
- Transaction volume
- Recent activity
- Inflow vs outflow patterns
- Inactive / low-activity signals

> Demo-oriented scoring. Not for regulatory AML enforcement.

---

## 🏗️ System Architecture

Telegram Bot
↓
Express API
↓
Services (Risk, EVM, Telegram)
↓
SQLite Database
↓
Polling Worker → Telegram Alerts

yaml
Copy code

---

## 🛠️ Tech Stack

- Node.js
- Express
- SQLite
- ethers.js
- Axios
- Telegram Bot API
- Etherscan API (Free Tier)

---

## 📸 Screenshots

screenshots/
├── bot-start.png
├── wallet-check.png
├── tracking-add.png
└── alert-message.png

scss
Copy code

```md
![Wallet Check](screenshots/wallet-check.png)
![Tracking Alert](screenshots/alert-message.png)
⚙️ Environment Configuration
Create a .env file:

env
Copy code
TELEGRAM_BOT_TOKEN=your_bot_token
ETHERSCAN_API_KEY=your_etherscan_key
BASE_URL=http://localhost:3000
▶️ Run Locally
bash
Copy code
npm install
node src/server.js
⚠️ Known Limitations
ERC-20 tokens and swaps not decoded

Free API rate limits apply

Demo-only AML logic

Not for real compliance use

👤 Author
Subhadip Mahanty
Blockchain & Backend Developer

GitHub: https://github.com/subha5554t

Telegram Bot: https://t.me/SettlX_AML_Bot

📄 Disclaimer
This is a demo AML project for learning and evaluation only.
Not intended for real-world financial compliance.

Copy code
