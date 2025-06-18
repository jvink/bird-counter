const db = require("../config/db.config");

const birdService = {
  getDailyBirds: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          morning_count as morning,
          noon_count as noon,
          evening_count as evening,
          total_count as total
        FROM daily_bird_stats
        WHERE date = date('now')
      `;

      db.get(query, [], (err, stats) => {
        if (err) reject(err);
        else resolve(stats || { morning: 0, noon: 0, evening: 0, total: 0 });
      });
    });
  },

  getRecentBirds: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT count, timestamp, image
        FROM bird_counter 
        ORDER BY timestamp DESC 
        LIMIT 50
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addBirdDetection: (count, timestamp, image) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bird_counter (count, timestamp, image) VALUES (?, ?, ?)",
        [count, timestamp, image],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};

module.exports = birdService;
