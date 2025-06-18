const db = require("../config/db.config");

new Promise((resolve, reject) => {
  // Add 45 new entries with timestamps slightly offset from 08:30:57
  const baseTimestamp = new Date("2025-06-18T08:30:57.563+02:00");
  
  db.serialize(() => {
    db.run("BEGIN TRANSACTION", (err) => {
      if (err) reject(err);
    });

    const stmt = db.prepare("INSERT INTO bird_counter (count, timestamp) VALUES (?, ?)");
    
    try {
      for (let i = 0; i < 45; i++) {
        // Add a small offset (2 seconds) between each entry to maintain order
        const newTimestamp = new Date(baseTimestamp.getTime() + (i * 2000));
        const formattedTimestamp = newTimestamp.toISOString().replace('Z', '+02:00');
        stmt.run(1, formattedTimestamp);
      }
      
      stmt.finalize();

      // Reset today's stats
      db.run("DELETE FROM daily_bird_stats WHERE date = date('now')");

      // Recalculate today's stats
      db.run(`
        INSERT INTO daily_bird_stats (date, morning_count, noon_count, evening_count, total_count)
        SELECT 
          date(timestamp),
          SUM(CASE WHEN time(datetime(timestamp, '+2 hours')) BETWEEN '06:00' AND '11:59' THEN count ELSE 0 END),
          SUM(CASE WHEN time(datetime(timestamp, '+2 hours')) BETWEEN '12:00' AND '17:59' THEN count ELSE 0 END),
          SUM(CASE WHEN time(datetime(timestamp, '+2 hours')) BETWEEN '18:00' AND '23:59' THEN count ELSE 0 END),
          SUM(count)
        FROM bird_counter
        WHERE date(timestamp) = date('now')
        GROUP BY date(timestamp)
      `);

      db.run("COMMIT", (err) => {
        if (err) {
          db.run("ROLLBACK");
          reject(err);
        } else {
          resolve();
        }
      });
    } catch (err) {
      db.run("ROLLBACK");
      reject(err);
    }
  });
}).then(() => {
  console.log("Successfully added 45 morning entries and updated daily stats");
  process.exit(0);
}).catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
