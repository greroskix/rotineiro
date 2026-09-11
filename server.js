const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Middleware de Autenticação via Token
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Não autorizado. Faça login para continuar.' });
  }
  const token = authHeader.substring(7);
  const user = db.getUserBySession(token);
  if (!user) {
    return res.status(401).json({ error: 'Sessão expirada ou inválida.' });
  }
  req.user = user;
  req.token = token;
  next();
}

// 1. Cadastro
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Por favor, informe um e-mail válido.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres.' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
  }

  try {
    const user = db.createUser(email, password);
    const token = db.createSession(user.id);
    return res.status(201).json({
      message: 'Conta criada com sucesso!',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    return res.status(500).json({ error: 'Erro interno ao criar conta.' });
  }
});

// 2. Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const user = db.getUserByEmail(email);
  if (!user || !db.verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  try {
    const token = db.createSession(user.id);
    return res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error('Erro ao autenticar:', err);
    return res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
});

// 3. Obter Usuário Atual
app.get('/api/auth/me', authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

// 4. Logout
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  db.deleteSession(req.token);
  return res.json({ ok: true, message: 'Sessão encerrada.' });
});

// 5. Carregar Dados de um Dia Específico
app.get('/api/routine/day', authMiddleware, (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const data = db.getDailyRecord(req.user.id, date);
  return res.json(data);
});

// 6. Salvar Progresso (Rotina, Remédios e Água)
app.post('/api/routine/save', authMiddleware, (req, res) => {
  const { date, completed_tasks, completed_meds, water_count } = req.body || {};
  const targetDate = date || new Date().toISOString().slice(0, 10);

  try {
    db.saveDailyRecord(req.user.id, targetDate, completed_tasks, completed_meds, water_count);
    return res.json({ ok: true, message: 'Progresso salvo no banco SQL com sucesso.' });
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    return res.status(500).json({ error: 'Falha ao salvar no banco de dados.' });
  }
});

// 7. Obter Histórico de Dias Anteriores
app.get('/api/routine/history', authMiddleware, (req, res) => {
  try {
    const history = db.getUserHistory(req.user.id);
    return res.json({ history });
  } catch (err) {
    console.error('Erro ao obter histórico:', err);
    return res.status(500).json({ error: 'Falha ao recuperar histórico.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Rotineiro rodando em http://localhost:${PORT}`);
});
