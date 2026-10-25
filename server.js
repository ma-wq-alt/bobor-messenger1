import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '10mb' })); // Увеличили лимит для картинок-аватарок
app.use(express.static(path.join(__dirname, 'public')));

const TURSO_URL = process.env.TURSO_URL;
const TURSO_TOKEN = process.env.TURSO_TOKEN;
const db = (TURSO_URL && TURSO_TOKEN) ? createClient({ url: TURSO_URL, authToken: TURSO_TOKEN }) : null;

async function initDB() {
  if (!db) return console.log('⚠️ НЕТ БАЗЫ!');
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id TEXT, from_email TEXT, from_name TEXT, text TEXT, image_url TEXT, date TEXT)`);
    await db.execute(`CREATE TABLE IF NOT EXISTS profiles (email TEXT PRIMARY KEY, avatar_url TEXT, custom_name TEXT)`);
    try { await db.execute('ALTER TABLE messages ADD COLUMN image_url TEXT'); } catch(e) {}
    try { await db.execute('ALTER TABLE profiles ADD COLUMN custom_name TEXT'); } catch(e) {}
    console.log('✅ База готова к работе');
  } catch (e) { console.error('❌ Ошибка базы:', e.message); }
}

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!db) return res.status(500).json({ error: 'Нет подключения к базе' });
  try {
    const u = await db.execute({ sql: 'SELECT email, name, display_name, pwd, role FROM users WHERE email = ?', args: [email] });
    if (u.rows.length === 0) return res.status(401).json({ error: 'Аккаунт не найден' });
    if (u.rows[0].pwd !== password) return res.status(401).json({ error: 'Неверный пароль' });
    
    const profile = await db.execute({ sql: 'SELECT avatar_url, custom_name FROM profiles WHERE email = ?', args: [u.rows[0].email] });
    const avatar = profile.rows.length > 0 ? profile.rows[0].avatar_url : '';
    const customName = profile.rows.length > 0 ? profile.rows[0].custom_name : '';

    // Если у пользователя есть кастомное имя, используем его. Иначе стандартное.
    const finalName = customName || u.rows[0].display_name || u.rows[0].name;

    return res.json({ success: true, user: { name: finalName, email: u.rows[0].email, role: u.rows[0].role || 'user', avatar } });
  } catch (e) { res.status(500).json({ error: 'Ошибка базы' }); }
});

app.get('/api/users', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute(`
      SELECT users.email, users.name, users.display_name, users.role, profiles.avatar_url, profiles.custom_name 
      FROM users 
      LEFT JOIN profiles ON users.email = profiles.email
    `);
    res.json(r.rows.map(u => ({ 
      email: u.email, 
      name: u.custom_name || u.display_name || u.name, 
      role: u.role,
      avatar: u.avatar_url || '' 
    })));
  } catch(e) { res.json([]); }
});

// СОХРАНЕНИЕ ПРОФИЛЯ (Аватарка + Имя)
app.post('/api/profile/save', async (req, res) => {
  const { email, avatar_url, custom_name } = req.body;
  if (!db) return res.status(500).json({ error: 'Нет базы' });
  try {
    await db.execute({ 
      sql: `INSERT INTO profiles (email, avatar_url, custom_name) VALUES (?, ?, ?) 
            ON CONFLICT(email) DO UPDATE SET avatar_url = ?, custom_name = ?`, 
      args: [email, avatar_url, custom_name, avatar_url, custom_name] 
    });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/messages/:chat_id', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute({ sql: 'SELECT * FROM messages WHERE chat_id = ? ORDER BY id', args: [req.params.chat_id] });
    res.json(r.rows);
  } catch (e) { res.json([]); }
});

app.post('/api/messages', async (req, res) => {
  const { chat_id, from_email, from_name, text, image_url } = req.body;
  if (!db) return res.status(500).json({ error: 'Нет базы' });
  if ((!text || !text.trim()) && !image_url) return res.status(400).json({ error: 'Пустое' });
  try {
    await db.execute({ sql: 'INSERT INTO messages (chat_id, from_email, from_name, text, image_url, date) VALUES (?, ?, ?, ?, ?, ?)', args: [chat_id, from_email, from_name, text || '', image_url || '', new Date().toLocaleString('ru-RU')] });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
initDB().then(() => app.listen(PORT, () => console.log(`💬 MESSENGER на :${PORT}`)));
