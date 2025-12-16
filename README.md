# SETTL X AML Telegram Bot 🛡️

## 🤖 Live Telegram Bot

You can interact with the bot here:

👉 **https://t.me/SettlX_AML_Bot**

Available features:
- Wallet AML-style risk check (`/check`)
- Wallet tracking & alerts (`/tracking`)
- Multi-chain support (Ethereum, Base, Avalanche, Solana)



A demo **AML (Anti-Money Laundering) Telegram bot** that performs **wallet risk checks** and **on-chain activity tracking** across multiple blockchains using **heuristic analysis** (no paid AML providers).

> ⚠️ Disclaimer  
> This project is for **educational and demonstration purposes only**.  
> It does **not** provide real AML, compliance, or legal guarantees.

---

## 🎯 Project Objective

The goal of this project is to build an **internship-grade backend system** that:

- Allows users to check wallet risk via Telegram
- Allows users to track wallets and receive alerts on new activity
- Demonstrates polling-based blockchain indexing
- Uses heuristic AML scoring (no paid AML services)

---

## ⛓️ Supported Blockchains

- Ethereum (ETH)
- Base
- Avalanche (AVAX)
- Solana (SOL)

---

## 🤖 Telegram Bot Commands

### Core Commands

| Command | Description |
|------|------------|
| `/start` | Welcome message |
| `/menu` | Show available commands |
| `/help` | Usage guide |
| `/check` | Wallet risk check |
| `/tracking` | Wallet tracking features |

---

## 🔍 `/check` – Wallet Risk Check

### Usage
/check <chain> <wallet_address>

shell
Copy code

### Example
/check eth 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

yaml
Copy code

### Response Includes
- Risk score (0–100)
- Risk level (Low / Medium / High)
- Heuristic reasons
- Blockchain explorer link

---

## 👀 `/tracking` – Wallet Tracking

### Tracking Menu
/tracking

shell
Copy code

### Sub-Commands
/tracking add-new
/tracking view-tracked
/tracking remove <label>
/tracking pause <label>

yaml
Copy code

---

### ➕ Add New Wallet (Step-by-Step)

1. `/tracking add-new`
2. Select chain (eth / base / avax / sol)
3. Enter wallet address
4. Enter label
5. Enter minimum amount (0 allowed)
6. Wallet starts tracking

---

## 🧠 AML Heuristic Risk Scoring

This project uses **simple heuristic rules**, such as:

- Limited RPC visibility → higher risk
- Inactive or new wallet → higher risk
- RPC fallback mode → medium risk

### Risk Levels
- **0–30** → Low Risk  
- **31–60** → Medium Risk  
- **61–100** → High Risk  

No external or paid AML APIs are used.

---

## ⚙️ Backend Architecture

### Tech Stack
- Node.js
- Express.js
- Telegram Bot API (Webhook)
- SQLite
- ethers.js (EVM)
- @solana/web3.js (Solana)

---

## 📁 Project Structure

settlx-aml-bot/
├── src/
│ ├── api/
│ ├── bot/
│ ├── services/
│ ├── workers/
│ ├── db/
│ ├── utils/
│ ├── config/
│ └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

yaml
Copy code

---

## 🔁 Tracking Engine (Polling Based)

### Why Polling?
- No paid indexers
- Full control over cost
- Works with public RPCs
- Deterministic behavior

### How It Works
1. Worker runs every 30–60 seconds (EVM)
2. Fetches blocks since last cursor
3. Matches transactions with tracked wallets
4. Applies minimum amount filter
5. Deduplicates alerts
6. Sends Telegram alert
7. Updates cursor

### Solana
- Uses `getSignaturesForAddress`
- Polls every 2–5 minutes
- Cursor = last processed signature

---

## 🗃️ Database Schema

### users
| Field | Description |
|---|---|
| id | Primary key |
| telegram_user_id | Telegram ID |

### tracked_addresses
| Field | Description |
|---|---|
| chain | eth / base / avax / sol |
| address | Wallet address |
| label | Friendly name |
| min_amount | Alert threshold |
| last_seen_cursor | Block / signature |

### alert_events
| Field | Description |
|---|---|
| tracked_address_id | FK |
| tx_hash_or_sig | Deduplication key |
| timestamp | Event time |

---

## 🔐 Deduplication Logic

Alerts are deduplicated using:

tracked_address_id + tx_hash_or_signature

yaml
Copy code

This ensures:
- No duplicate alerts
- Safe polling restarts
- Idempotent processing

---

## 💰 Cost Control Rules

- Max wallets per user (recommended: 20)
- Max total wallets (recommended: 200)
- Slower polling for Solana
- Strict deduplication
- Public RPC usage only

---

## 🚀 Local Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/subha5554t/settlx-aml-telegram-bot.git
cd settlx-aml-telegram-bot
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Environment Variables
Create .env (do not commit):

env
Copy code
PORT=3000
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN

ETH_RPC=https://cloudflare-eth.com
BASE_RPC=https://base.publicnode.com
AVAX_RPC=https://avalanche.publicnode.com
SOL_RPC=https://api.mainnet-beta.solana.com
4️⃣ Run Server
bash
Copy code
node src/server.js
5️⃣ Expose via ngrok
bash
Copy code
ngrok http 3000
Set webhook:

bash
Copy code
https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<NGROK_URL>/telegram/webhook
🧪 /check API Example
http
Copy code
POST /check
Content-Type: application/json

{
  "chain": "eth",
  "targetAddress": "0x..."
}
🧠 Interview Summary
“This project demonstrates a polling-based AML Telegram bot with heuristic risk scoring across EVM chains and Solana, focusing on backend architecture, deduplication, and cost control.”

🔮 Future Improvements
Paid AML provider integration

Indexer-based tracking

Telegram Web App dashboard

Advanced risk heuristics

Token / contract analysis

👤 Author
Subhadip Mahanty
B.Tech CSE
Blockchain & Backend Developer

📜 License
MIT License
