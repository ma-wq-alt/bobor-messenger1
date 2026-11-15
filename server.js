import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Важно: раздаем статику из папки public
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Проверка статуса
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    openai: !!openai,
    time: new Date().toISOString()
  });
});

// Чат с Марко
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body || {};
  if (!message) return res.status(400).json({ error: "empty message" });

  if (!openai) {
    return res.json({ reply: "Извини, тренутно сам офлајн. Покушај касније.", fallback: true });
  }

  try {
    const messages = [
      { role: "system", content: "Ti si Marko, prijateljski bobar koji govori SAMO na srpskom. Odgovaraj kratko (1-2 rečenice)." }
    ];
    if (Array.isArray(history)) {
      history.slice(-10).forEach(m => {
        if (m.who === "user") messages.push({ role: "user", content: m.sr });
        else if (m.who === "bot") messages.push({ role: "assistant", content: m.sr });
      });
    }
    messages.push({ role: "user", content: message.trim() });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      max_tokens: 150,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "ai_error", reply: "Марко је заузет. Покушај поново." });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🦫 Сервер запущен на порту ${PORT}`);
});
