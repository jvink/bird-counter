const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bird_counter.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bird_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    count INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS daily_bird_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    morning_count INTEGER DEFAULT 0,
    noon_count INTEGER DEFAULT 0,
    evening_count INTEGER DEFAULT 0,
    total_count INTEGER DEFAULT 0,
    UNIQUE(date)
  )`);

  // Run cleanup every 10 minutes on bird_counter table
  db.run(`CREATE TRIGGER IF NOT EXISTS cleanup_old_records
    AFTER INSERT ON bird_counter
    BEGIN
      DELETE FROM bird_counter
      WHERE timestamp < datetime('now', '-10 minutes');
    END;  
  `);

  db.run(`CREATE TRIGGER IF NOT EXISTS update_daily_stats
    AFTER INSERT ON bird_counter
    BEGIN
      INSERT INTO daily_bird_stats (date, morning_count, noon_count, evening_count, total_count)
      VALUES (
        date(NEW.timestamp),
        CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '06:00' AND '11:59' THEN NEW.count ELSE 0 END,
        CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '12:00' AND '17:59' THEN NEW.count ELSE 0 END,
        CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '18:00' AND '23:59' THEN NEW.count ELSE 0 END,
        NEW.count
      )
      ON CONFLICT(date) DO UPDATE SET
        morning_count = morning_count + CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '06:00' AND '11:59' THEN NEW.count ELSE 0 END,
        noon_count = noon_count + CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '12:00' AND '17:59' THEN NEW.count ELSE 0 END,
        evening_count = evening_count + CASE WHEN time(datetime(NEW.timestamp, '+2 hours')) BETWEEN '18:00' AND '23:59' THEN NEW.count ELSE 0 END,
        total_count = total_count + NEW.count;
    END;
  `);
});

module.exports = db;
