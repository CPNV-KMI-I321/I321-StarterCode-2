import { db } from '../config/database.js';

export function findAll() {
  return db.prepare('SELECT * FROM pizzas ORDER BY id').all();
}

export function findById(id) {
  return db.prepare('SELECT * FROM pizzas WHERE id = ?').get(id);
}

export function create({ name, description, price, imageUrl }) {
  const result = db.prepare(`
    INSERT INTO pizzas (name, description, price, imageUrl) VALUES (?, ?, ?, ?)
  `).run(name, description, price, imageUrl);
  return findById(Number(result.lastInsertRowid));
}

export function update(id, { name, description, price, imageUrl }) {
  db.prepare(`UPDATE pizzas SET name = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?`)
    .run(name, description, price, imageUrl, id);
  return findById(id);
}

export function remove(id) {
  return db.prepare('DELETE FROM pizzas WHERE id = ?').run(id).changes > 0;
}
