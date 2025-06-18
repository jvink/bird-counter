const db = require("../config/db.config");

const removeAfternoonEntries = () => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM bird_counter 
      WHERE substr(timestamp, 12, 2) >= '15'
    `;

    db.run(query, [], function (err) {
      if (err) {
        console.error("Error removing entries:", err);
        reject(err);
      } else {
        console.log(
          `Successfully removed ${this.changes} entries from 15:00 onwards`
        );
        resolve(this.changes);
      }
    });
  });
};

const clearNoonStats = () => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE daily_bird_stats
      SET noon_count = 0
      WHERE date = date('now')
    `;

    db.run(query, [], function (err) {
      if (err) {
        console.error("Error clearing noon stats:", err);
        reject(err);
      } else {
        console.log(`Successfully cleared noon count from daily stats`);
        resolve(this.changes);
      }
    });
  });
};

const updateDailyStats = () => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE daily_bird_stats
      SET total_count = (
        SELECT COALESCE(SUM(count), 0)
        FROM bird_counter
        WHERE date(timestamp) = date('now')
      )
      WHERE date = date('now')
    `;

    db.run(query, [], function (err) {
      if (err) {
        console.error("Error updating total count:", err);
        reject(err);
      } else {
        console.log(`Successfully updated daily stats total`);
        resolve(this.changes);
      }
    });
  });
};

Promise.all([
  removeAfternoonEntries(),
  clearNoonStats(),
  updateDailyStats()
])
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
