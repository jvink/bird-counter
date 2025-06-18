const express = require("express");
const router = express.Router();
const birdController = require("../controllers/bird.controller");

// Get latest bird detections
router.get("/", birdController.getRecentBirds);

// Get bird statistics
router.get("/stats", birdController.getBirdStats);

module.exports = router;
