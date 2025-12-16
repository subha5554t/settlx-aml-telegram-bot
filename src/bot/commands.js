module.exports = {
  start: `
👋 Welcome to SETTL X AML Bot

This bot helps you:
• Check wallet risk (AML-style)
• Track wallets & get alerts

Available commands:
/menu – Show options
/check – Check wallet risk
/tracking – Track wallet activity
/help – How to use
`,

  menu: `
📋 Menu

Choose an option:
/check – Wallet risk summary
/tracking – Track wallet activity
/help – Usage guide
`,

  help: `
ℹ️ Help – How to use this bot

/check
• Choose blockchain (ETH / Base / AVAX / Solana)
• Enter wallet address
• Get AML-style risk score

/tracking
• Add wallet to watchlist
• Set minimum amount
• Receive alerts on activity
`,

  check: `
🔍 Wallet Risk Check

Use the /check API endpoint to check wallet risk.

Example:
• Chain: Ethereum
• Address: 0x...

You will receive:
• Risk score (0–100)
• Risk level
• Recent activity
`,

  tracking: `
👀 Wallet Tracking

Tracking allows you to:
• Monitor wallet activity
• Get Telegram alerts

Actions:
/tracking add-new
/tracking view-tracked
`
};
