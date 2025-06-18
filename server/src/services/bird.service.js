const db = require("../config/db.config");

const convertToLocalTime = (timestamp) => {
  const date = new Date(timestamp);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, -1) + "+02:00";
};

const birdService = {
  addBirdDetection: (count, timestamp, image) => {
    const localTimestamp = convertToLocalTime(timestamp);

    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bird_counter (count, timestamp, image) VALUES (?, ?, ?)",
        [count, localTimestamp, image],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
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

  getLatestBird: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT count, timestamp, image
        FROM bird_counter 
        ORDER BY timestamp DESC 
        LIMIT 1
      `;

      db.get(query, [], (err, row) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  },

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
};

module.exports = birdService;
