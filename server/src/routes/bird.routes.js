const express = require("express");
const router = express.Router();
const birdController = require("../controllers/bird.controller");

// Get latest bird detections
router.get("/", birdController.getRecentBirds);

// Get daily birds
router.get("/daily", birdController.getDailyBirds);

module.exports = router;
