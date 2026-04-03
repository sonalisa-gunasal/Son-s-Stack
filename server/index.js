const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client, Pool } = require('pg');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// const db = new sqlite3.Database('./questions.db');

// --- PG DATABASE CREATION LOGIC START ---
async function ensureSchemaExistsAndInit() {
  const schemaName = 'sons_stack';
  const connStr = process.env.PG_ADMIN_URL || 'postgres://postgres:postgres@localhost:5432/postgres';
  const client = new Client({ connectionString: connStr });
  await client.connect();
  // 1. Ensure schema exists
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
  // 2. Set search_path to schema for this session
  await client.query(`SET search_path TO ${schemaName}`);
  // 3. Create tables in the schema
  await client.query(`CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    description TEXT
  )`);
  await client.query(`CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT
  )`);
  await client.query(`CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    technology_id INTEGER REFERENCES technologies(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
  )`);
  await client.query(`CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`);
  console.log(`Schema '${schemaName}' and tables ensured.`);
  // Optionally export a Pool with search_path set for use in routes
  const pgPool = new Pool({ connectionString: connStr, options: `-c search_path=${schemaName}` });
  global.pgPool = pgPool;
  await client.end();
}

ensureSchemaExistsAndInit().catch(e => {
  console.error('Failed to initialize PostgreSQL schema/tables:', e);
  process.exit(1);
});
// --- PG DATABASE CREATION LOGIC END ---

// Removed SQLite legacy table creation


// --- API ROUTES ---
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/technologies', require('./routes/technologyRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
