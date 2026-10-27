import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const TURSO_URL = process.env.TURSO_URL;
const TURSO_TOKEN = process.env.TURSO_TOKEN;
const db = (TURSO_URL && TURSO_TOKEN) ? createClient({ url: TURSO_URL, authToken: TURSO_TOKEN }) : null;

const ADMIN_PASSWORD = 'тсб';

async function initDB() {
  if (!db) return console.log('⚠️ НЕТ БАЗЫ!');
  try {
    await db.batch([
      `CREATE TABLE IF NOT EXISTS cinema_videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, season INTEGER, episode INTEGER, url TEXT)`,
      `CREATE TABLE IF NOT EXISTS watch_progress (user_email TEXT, video_id INTEGER, progress REAL, duration REAL, updated_at TEXT, PRIMARY KEY (user_email, video_id))`
    ]);
    console.log('✅ База и прогресс готовы');
  } catch (e) { console.error('Ошибка базы:', e.message); }
}

app.post('/api/login', async (req, res) => {
  const { email, password, secret } = req.body;
  
  // Вход для Админа (по секретному паролю)
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, user: { name: 'Админ', email: 'admin@bobor.ru', role: 'admin' } });
  }

  if (!db) return res.status(500).json({ error: 'Нет подключения к базе' });
  
  try {
    const u = await db.execute({ sql: 'SELECT * FROM users WHERE email = ?', args: [email] });
    if (u.rows.length === 0) return res.status(401).json({ error: 'Аккаунт не найден' });
    if (u.rows[0].pwd !== password) return res.status(401).json({ error: 'Неверный пароль' });
    // Если у пользователя в банке есть секретное слово, проверяем и его
    if (u.rows[0].secret_word && secret && u.rows[0].secret_word !== secret) {
        return res.status(401).json({ error: 'Неверное секретное слово' });
    }
    
    const name = u.rows[0].display_name || u.rows[0].name;
    
    // === ЖЕСТКАЯ ПРОВЕРКА НА АДМИНА ===
    // Если это твой email, мы всегда даем роль админа, чтобы админка была доступна
    let finalRole = u.rows[0].role || 'user';
    if (email === 'mar.maks999@gmail.com') {
      finalRole = 'admin';
    }

    return res.json({ success: true, user: { name: name, email: u.rows[0].email, role: finalRole } });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка базы: ' + e.message });
  }
});

app.get('/api/videos', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute('SELECT * FROM cinema_videos ORDER BY season, episode');
    res.json(r.rows);
  } catch(e) { res.json([]); }
});

app.post('/api/videos', async (req, res) => {
  const { password, title, season, episode, url } = req.body;
  if (password !== ADMIN_PASSWORD && password !== '1495') return res.status(401).json({ error: 'Нет доступа' });
  if (!db) return res.status(500).json({ error: 'Нет базы' });
  try {
    await db.execute({ sql: 'INSERT INTO cinema_videos (title, season, episode, url) VALUES (?, ?, ?, ?)', args: [title, season, episode, url] });
    res.json({ success: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/videos/:id', async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD && password !== '1495') return res.status(401).json({ error: 'Нет доступа' });
  if (!db) return res.status(500).json({ error: 'Нет базы' });
  try {
    await db.execute({ sql: 'DELETE FROM cinema_videos WHERE id = ?', args: [req.params.id] });
    res.json({ success: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/progress/:email', async (req, res) => {
  if (!db) return res.json([]);
  try {
    const r = await db.execute({ sql: 'SELECT * FROM watch_progress WHERE user_email = ?', args: [req.params.email] });
    res.json(r.rows);
  } catch(e) { res.json([]); }
});

app.post('/api/progress', async (req, res) => {
  const { email, video_id, progress, duration } = req.body;
  if (!db || !email || email === 'guest') return res.json({ success: false });
  try {
    await db.execute({
      sql: `INSERT INTO watch_progress (user_email, video_id, progress, duration, updated_at) 
            VALUES (?, ?, ?, ?, ?) 
            ON CONFLICT(user_email, video_id) DO UPDATE SET progress = ?, duration = ?, updated_at = ?`,
      args: [email, video_id, progress, duration, new Date().toISOString(), progress, duration, new Date().toISOString()]
    });
    res.json({ success: true });
  } catch(e) { 
    res.status(500).json({ error: e.message }); 
  }
});

const PORT = process.env.PORT || 3000;
initDB().then(() => app.listen(PORT, () => console.log(`🎬 BOBOR PRODUCTION на :${PORT}`)));
