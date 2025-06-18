const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bird_counter.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bird_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    count INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    image TEXT
  )`);
});

module.exports = db;
