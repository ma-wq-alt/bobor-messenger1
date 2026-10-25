import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const TURSO_URL = process.env.TURSO_URL;
const TURSO_TOKEN = process.env.TURSO_TOKEN;
const db = (TURSO_URL && TURSO_TOKEN) ? createClient({ url: TURSO_URL, authToken: TURSO_TOKEN }) : null;

const ADMIN_PASSWORD = 'тсб';

async function initDB() {
  if (!db) return console.log('⚠️ НЕТ БАЗЫ!');
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        chat_id TEXT, 
        from_email TEXT, 
        from_name TEXT, 
        text TEXT, 
        date TEXT
      )
    `);
    console.log('✅ База чата готова');
  } catch (e) { console.error('Ошибка базы:', e.message); }
}

// Вход через банк
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Вход для Админа
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, user: { name: 'Админ', email: 'admin@bobor.ru', role: 'admin' } });
  }

  if (!db) return res.status(500).json({ error: 'Нет подключения к базе' });
  
  try {
    const u = await db.execute({ sql: 'SELECT email, name, display_name, pwd FROM users WHERE email = ?', args: [email] });
    if (u.rows.length === 0) return res.status(401).json({ error: 'Аккаунт не найден в банке' });
    
    if (u.rows[0].pwd !== password) return res.status(401).json({ error: 'Неверный пароль' });
    
    const name = u.rows[0].display_name || u.rows[0].name;
    return res.json({ success: true, user: { name: name, email: u.rows[0].email, role: 'user' } });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка базы: ' + e.message });
  }
});

// Список всех людей (чтобы было с кем переписываться)
app.get('/api/users', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute('SELECT email, name, display_name FROM users');
    const users = r.rows.map(u => ({ email: u.email, name: u.display_name || u.name }));
    res.json(users);
  } catch(e) { res.json([]); }
});

// Сообщения
app.get('/api/messages/:chat_id', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute({ sql: 'SELECT * FROM messages WHERE chat_id = ? ORDER BY id', args: [req.params.chat_id] });
    res.json(r.rows);
  } catch (e) { res.json([]); }
});

app.post('/api/messages', async (req, res) => {
  const { chat_id, from_email, from_name, text } = req.body;
  if (!db) return res.status(500).json({ error: 'Нет базы' });
  try {
    await db.execute({ 
      sql: 'INSERT INTO messages (chat_id, from_email, from_name, text, date) VALUES (?, ?, ?, ?, ?)', 
      args: [chat_id, from_email, from_name, text, new Date().toLocaleString('ru-RU')] 
    });
    res.json({ success: true });
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

const PORT = process.env.PORT || 3000;
initDB().then(() => app.listen(PORT, () => console.log(`💬 BOBOR MESSENGER на :${PORT}`)));
