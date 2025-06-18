const express = require("express");
const router = express.Router();
const birdController = require("../controllers/bird.controller");

// Get 50 latest birds
router.get("/", birdController.getRecentBirds);

// Get latest bird
router.get("/latest", birdController.getLatestBird);

// Get daily birds
router.get("/daily", birdController.getDailyBirds);

module.exports = router;
