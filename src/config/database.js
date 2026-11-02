import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const path = process.env.DB_PATH || './data/foodtruck.sqlite';
if (path !== ':memory:') mkdirSync(dirname(resolve(path)), { recursive: true });
export const db = new DatabaseSync(path);
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;
  CREATE TABLE IF NOT EXISTS pizzas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price REAL NOT NULL CHECK (price >= 0),
    imageUrl TEXT
  );
  CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0)
  );
`);
