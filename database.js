const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');
const path = require('node:path');

const dbPath = path.join(__dirname, 'rotineiro.db');
const db = new DatabaseSync(dbPath);

db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS daily_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    record_date TEXT NOT NULL,
    completed_tasks TEXT DEFAULT '[]',
    completed_meds TEXT DEFAULT '[]',
    water_count INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, record_date)
  );
`);

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const hashBuffer = crypto.scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  return crypto.timingSafeEqual(hashBuffer, keyBuffer);
}

function createUser(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const passwordHash = hashPassword(password);
  const stmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
  const info = stmt.run(cleanEmail, passwordHash);
  return { id: Number(info.lastInsertRowid), email: cleanEmail };
}

function getUserByEmail(email) {
  const stmt = db.prepare('SELECT id, email, password_hash, created_at FROM users WHERE email = ?');
  return stmt.get(email.trim().toLowerCase()) || null;
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const stmt = db.prepare('INSERT INTO user_sessions (token, user_id) VALUES (?, ?)');
  stmt.run(token, userId);
  return token;
}

function getUserBySession(token) {
  if (!token) return null;
  const stmt = db.prepare(`
    SELECT u.id, u.email, u.created_at
    FROM user_sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ?
  `);
  return stmt.get(token) || null;
}

function deleteSession(token) {
  if (!token) return;
  const stmt = db.prepare('DELETE FROM user_sessions WHERE token = ?');
  stmt.run(token);
}

function saveDailyRecord(userId, date, tasks, meds, water) {
  const stmt = db.prepare(`
    INSERT INTO daily_records (user_id, record_date, completed_tasks, completed_meds, water_count, updated_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, record_date) DO UPDATE SET
      completed_tasks = excluded.completed_tasks,
      completed_meds = excluded.completed_meds,
      water_count = excluded.water_count,
      updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(
    userId,
    date,
    JSON.stringify(tasks || []),
    JSON.stringify(meds || []),
    Number(water) || 0
  );
}

function getDailyRecord(userId, date) {
  const stmt = db.prepare(`
    SELECT completed_tasks, completed_meds, water_count, updated_at
    FROM daily_records
    WHERE user_id = ? AND record_date = ?
  `);
  const row = stmt.get(userId, date);
  if (!row) {
    return { completed_tasks: [], completed_meds: [], water_count: 0 };
  }
  return {
    completed_tasks: JSON.parse(row.completed_tasks || '[]'),
    completed_meds: JSON.parse(row.completed_meds || '[]'),
    water_count: row.water_count || 0,
    updated_at: row.updated_at
  };
}

function getUserHistory(userId) {
  const stmt = db.prepare(`
    SELECT record_date, completed_tasks, completed_meds, water_count, updated_at
    FROM daily_records
    WHERE user_id = ?
    ORDER BY record_date DESC
    LIMIT 30
  `);
  const rows = stmt.all(userId) || [];
  return rows.map(r => ({
    date: r.record_date,
    tasksCount: JSON.parse(r.completed_tasks || '[]').length,
    medsCount: JSON.parse(r.completed_meds || '[]').length,
    waterCount: r.water_count,
    updatedAt: r.updated_at
  }));
}

module.exports = {
  createUser,
  getUserByEmail,
  verifyPassword,
  createSession,
  getUserBySession,
  deleteSession,
  saveDailyRecord,
  getDailyRecord,
  getUserHistory
};
