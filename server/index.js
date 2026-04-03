const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./questions.db');

// Create tables if not exist
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    question TEXT,
    answer TEXT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )`);
};
initDb();

// Admin login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const adminPass = process.env.ADMIN_PASS || 'admin123';
  if (password === adminPass) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid password' });
});

// Get categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add category (admin only)
app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO categories (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

// Edit category (admin only)
app.put('/api/categories/:id', (req, res) => {
  const { name } = req.body;
  db.run('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: req.params.id, name });
  });
});

// Get questions by category
app.get('/api/questions/:categoryId', (req, res) => {
  db.all('SELECT * FROM questions WHERE category_id = ?', [req.params.categoryId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add question (admin only)
app.post('/api/questions', (req, res) => {
  const { category_id, question, answer } = req.body;
  db.run('INSERT INTO questions (category_id, question, answer) VALUES (?, ?, ?)', [category_id, question, answer], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, category_id, question, answer });
  });
});

// Edit question (admin only)
app.put('/api/questions/:id', (req, res) => {
  const { question, answer } = req.body;
  db.run('UPDATE questions SET question = ?, answer = ? WHERE id = ?', [question, answer, req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: req.params.id, question, answer });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
