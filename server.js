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

// Инициализация OpenAI (если нет ключа — чат работает в заглушке)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ============================================================
// HEALTH CHECK
// ============================================================
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    openai: !!openai,
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    time: new Date().toISOString()
  });
});

// ============================================================
// ЧАТ С МАРКО — настоящая нейронка
// ============================================================
const SYSTEM_PROMPT = `Ti si Marko, prijateljski bobar 🦫 koji pomaže ljudima da nauče srpski jezik.

PRAVILA:
1. Uvek odgovaraj SAMO na srpskom jeziku (latinica ili ćirilica — biraj ćirilicu, jer korisnik uči srpsku ćirilicu).
2. Odgovori kratki: 1-2 rečenice, max 200 karaktera.
3. Budi prijateljski, topao, podstiči korisnika.
4. Ako korisnik pogreši u srpskom — nežno ga ispravi.
5. Ako korisnik piše na ruskom — pokušaj da razumeš, ali odgovaraj na srpskom.
6. Ako korisnik pita nešto van teme (politika, religija, nasilje) — ljubazno skreni temu na učenje srpskog.
7. Povremeno postavljaj pitanje korisniku da održiš razgovor.
8. Koristi jednostavan rečnik za početnike.

Primeri dobrih odgovora:
- "Здраво! Како си данас?"
- "Одлично! Шта си радио јутрос?"
- "Лепо! Реци ми, одакле си?"

NIKAD ne izlazi iz uloge Marka. NIKAD ne govori engleski ili ruski (osim ako baš moraš da objasniš jednu reč).`;

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body || {};
  
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "empty message" });
  }
  if (message.length > 500) {
    return res.status(400).json({ error: "message too long (max 500)" });
  }

  // Если нет ключа — заглушка
  if (!openai) {
    return res.json({
      reply: fallbackReply(message),
      fallback: true,
      note: "OPENAI_API_KEY not set — using offline replies"
    });
  }

  try {
    // Собираем историю (последние 10 сообщений)
    const messages = [{ role: "system", content: SYSTEM_PROMPT }];
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
      temperature: 0.8
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "Извини, нисам разумео.";
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({
      error: "ai_error",
      reply: fallbackReply(message)
    });
  }
});

// Офлайн-заглушка (если нет ключа или ошибка API)
function fallbackReply(message) {
  const t = message.toLowerCase().trim();
  const replies = {
    greeting: [
      "Здраво! Како си?",
      "Ћао! Драго ми је што те видим.",
      "Добар дан! Шта има?"
    ],
    howAreYou: [
      "Добро сам, хвала! А ти?",
      "Одлично! Како си ти?"
    ],
    name: [
      "Зовем се Марко. Како се ти зовеш?",
      "Ја сам Марко, твој пријатељ за српски. А ти?"
    ],
    origin: [
      "Ја сам из Србије, из Београда. Одакле си ти?",
      "Из Новог Сада сам. А ти?"
    ],
    thanks: [
      "Нема на чему! Увек ми је драго да помогнем.",
      "Молим! То је мој посао."
    ],
    goodbye: [
      "Довиђења! Видимо се ускоро.",
      "Лаку ноћ! Срећно са учењем."
    ],
    help: [
      "Могу да разговарам са тобом на српском. Питај ме било шта!"
    ],
    unknown: [
      "Извини, не разумем најбоље. Можеш ли поновити?",
      "Хм, нисам сигуран шта мислиш. Покушај другачије.",
      "Занимљиво! Реци ми више о томе."
    ]
  };
  
  if (/^(здраво|ћао|добар дан|добро јутро|добро вече|поздрав|zdravo|cao)/.test(t)) return pick(replies.greeting);
  if (/како си|како сте|шта има|kako si/.test(t)) return pick(replies.howAreYou);
  if (/зовеш|зовем се|име|kako se/.test(t)) return pick(replies.name);
  if (/одакле|где си|odakle/.test(t)) return pick(replies.origin);
  if (/хвала|благодарим|фала|hvala/.test(t)) return pick(replies.thanks);
  if (/довиђења|чао|видимо се|лаку ноћ|dovidjenja/.test(t)) return pick(replies.goodbye);
  if (/помоћ|помози|помоћи|pomoc/.test(t)) return pick(replies.help);
  return pick(replies.unknown);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// SPA fallback — все запросы отдают index.html
// ============================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🦫 BOBOR-LINGUO запущен на http://localhost:${PORT}`);
  console.log(`   OpenAI: ${openai ? "✓ подключён" : "✗ не настроен (используется заглушка)"}`);
});
