const db = require("../config/db.config");

const birdService = {
  getRecentBirds: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT count, timestamp, image, centroid_x, centroid_y 
        FROM bird_counter 
        ORDER BY timestamp DESC 
        LIMIT 100
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getBirdStats: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) as total_records,
          SUM(count) as total_birds,
          AVG(count) as avg_birds,
          MAX(count) as max_birds
        FROM bird_counter
      `;

      db.get(query, [], (err, stats) => {
        if (err) reject(err);
        else resolve(stats);
      });
    });
  },

  addBirdDetection: (count, timestamp, image, centroid) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bird_counter (count, timestamp, image, centroid_x, centroid_y) VALUES (?, ?, ?, ?, ?)",
        [count, timestamp, image, centroid[0], centroid[1]],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};

module.exports = birdService;
