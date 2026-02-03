const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shopify_order_id TEXT UNIQUE,
      payload TEXT,
      store TEXT,
      status TEXT,
      attempts INTEGER DEFAULT 0,
      error TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

exports.run = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, err => (err ? reject(err) : resolve()))
  );

exports.get = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)))
  );

exports.all = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)))
  );
