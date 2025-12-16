const axios = require("axios");
const state = require("../bot/state");
const db = require("../db");
const commands = require("../bot/commands");

const API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

async function send(chatId, text) {
  try {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text
    });
  } catch (err) {
    console.error("❌ Send failed:", err.response?.data || err.message);
  }
}

async function handle(update) {
  if (!update.message) return;

  const chatId = update.message.chat.id;
  const text = update.message.text?.trim();
  if (!text) return;

  console.log("➡️ Message:", text);

  const userId = await db.getOrCreateUser(chatId);
  const session = state.get(chatId);

  // ======================
  // STATE FLOW (ADD-NEW)
  // ======================
  if (session) {
    if (session.step === "chain") {
      session.chain = text.toLowerCase();
      session.step = "address";
      return send(chatId, "Enter wallet address");
    }

    if (session.step === "address") {
      session.address = text;
      session.step = "label";
      return send(chatId, "Enter label");
    }

    if (session.step === "label") {
      session.label = text;
      session.step = "min";
      return send(chatId, "Enter minimum amount (0 allowed)");
    }

    if (session.step === "min") {
      await db.addTracked({
        user_id: userId,
        chain: session.chain,
        address: session.address,
        label: session.label,
        min_amount: Number(text)
      });

      state.clear(chatId);
      return send(
        chatId,
        `✅ Success, now tracking ${session.label} on ${session.chain.toUpperCase()}`
      );
    }
  }

  // ======================
  // BASIC COMMANDS
  // ======================
  if (text === "/start") {
    return send(chatId, commands.start);
  }

  if (text === "/menu") {
    return send(chatId, commands.menu);
  }

  if (text === "/help") {
    return send(chatId, commands.help);
  }

// ======================
// /check COMMAND
// ======================
if (text.startsWith("/check")) {
  const parts = text.split(" ");

  if (parts.length !== 3) {
    return send(
      chatId,
      "❌ Usage:\n/check <chain> <wallet>\n\nExample:\n/check eth 0xd8dA6B..."
    );
  }

  const chain = parts[1].toLowerCase();
  const address = parts[2];

  try {
    const response = await axios.post("http://localhost:3000/check", {
      chain,
      targetAddress: address
    });

    const r = response.data;

    return send(
      chatId,
      `🔍 Wallet Risk Check\n\n` +
        `Chain: ${chain.toUpperCase()}\n` +
        `Address: ${address}\n\n` +
        `Risk Score: ${r.riskScore}\n` +
        `Risk Level: ${r.riskLevel}\n` +
        `Reasons: ${r.reasons.join(", ") || "N/A"}\n\n` +
        `🔗 Explorer:\n${r.explorerLink}`
    );
  } catch (err) {
    console.error("Check error:", err.response?.data || err.message);
    return send(chatId, "⚠️ Failed to check wallet.");
  }
}



  // ======================
  // TRACKING COMMANDS
  // ======================
  if (text.startsWith("/tracking")) {
    const parts = text.split(" ");

    if (parts.length === 1) {
      return send(
        chatId,
        "📌 Tracking Menu\n\n" +
          "/tracking add-new\n" +
          "/tracking view-tracked\n" +
          "/tracking remove <label>\n" +
          "/tracking pause <label>"
      );
    }

    if (parts[1] === "add-new") {
      state.set(chatId, { step: "chain" });
      return send(chatId, "Select chain: eth | base | avax | sol");
    }

    if (parts[1] === "view-tracked") {
      const rows = await db.listTracked(userId);

      if (!rows.length) {
        return send(chatId, "📭 No wallets tracked.");
      }

      return send(
        chatId,
        rows
          .map(
            (r, i) =>
              `${i + 1}. ${r.label} (${r.chain.toUpperCase()})\n${r.address}`
          )
          .join("\n\n")
      );
    }

    return send(chatId, "❌ Unknown tracking command");
  }

  return send(chatId, "❌ Unknown command.\nUse /menu to see available options.");
}

module.exports = { handle };
