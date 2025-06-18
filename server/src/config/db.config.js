const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bird_counter.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bird_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    count INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    image TEXT,
    centroid_x INTEGER,
    centroid_y INTEGER
  )`);
});

module.exports = db;
