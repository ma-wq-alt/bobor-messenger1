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

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

let openai = null;
if (process.env.GEMINI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
  });
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, openai: !!openai, model: "gemini-2.0-flash" });
});

const SYSTEM_PROMPT = `Ti si Marko, prijateljski bobar 🦫 koji pomaže ljudima da nauče srpski jezik.
PRAVILA:
1. Uvek odgovaraj SAMO na srpskom jeziku.
2. Odgovori kratki: 1-2 rečenice.
3. Budi prijateljski i podstiči korisnika.`;

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body || {};
  if (!message) return res.status(400).json({ error: "empty message" });

  if (!openai) {
    return res.json({ reply: "Извини, тренутно сам офлајн.", fallback: true });
  }

  try {
    const messages = [{ role: "system", content: SYSTEM_PROMPT }];
    if (Array.isArray(history)) {
      history.slice(-10).forEach(m => {
        messages.push({ role: m.who === "user" ? "user" : "assistant", content: m.sr });
      });
    }
    messages.push({ role: "user", content: message.trim() });

    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages,
      max_tokens: 150
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: "Марко је заузет, покушај поново." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`🦫 BOBOR-LINGUO на порту ${PORT}`));
