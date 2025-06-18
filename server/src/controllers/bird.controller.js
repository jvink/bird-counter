const birdService = require('../services/bird.service');

const birdController = {
  getRecentBirds: async (req, res) => {
    try {
      const birds = await birdService.getRecentBirds();
      res.json(birds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getBirdStats: async (req, res) => {
    try {
      const stats = await birdService.getBirdStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = birdController;
