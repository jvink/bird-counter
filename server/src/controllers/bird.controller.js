const birdService = require("../services/bird.service");

const birdController = {
  getRecentBirds: async (req, res) => {
    try {
      const birds = await birdService.getRecentBirds();
      res.json(birds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getLatestBird: async (req, res) => {
    try {
      const bird = await birdService.getLatestBird();
      res.json(bird);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getDailyBirds: async (req, res) => {
    try {
      const stats = await birdService.getDailyBirds();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = birdController;
