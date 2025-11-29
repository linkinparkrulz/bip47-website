import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../database.sqlite');

let db;

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
      } else {
        console.log('📦 Connected to SQLite database');
        createTables().then(() => {
          // Make database available to app
          resolve(db);
        }).catch(reject);
      }
    });
  });
}

async function createTables() {
  const run = promisify(db.run.bind(db));
  
  try {
    // Users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        public_key TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        payment_code TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Guestbook entries table
    await run(`
      CREATE TABLE IF NOT EXISTS guestbook_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        payment_code TEXT NOT NULL,
        message TEXT NOT NULL,
        signature TEXT NOT NULL,
        public_key TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Paynym contacts table
    await run(`
      CREATE TABLE IF NOT EXISTS paynym_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        contact_payment_code TEXT NOT NULL,
        contact_username TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
    
    console.log('📋 Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

export function getDatabase() {
  return db;
}

export async function query(sql, params = []) {
  const all = promisify(db.all.bind(db));
  return await all(sql, params);
}

export async function run(sql, params = []) {
  const run = promisify(db.run.bind(db));
  return await run(sql, params);
}

export async function get(sql, params = []) {
  const get = promisify(db.get.bind(db));
  return await get(sql, params);
}
