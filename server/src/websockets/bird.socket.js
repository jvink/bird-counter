const birdService = require("../services/bird.service");
const { isDuplicate, updateLastDetection } = require("../utils/detection");

const setupBirdSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", async (msg) => {
      const { count, timestamp, image, centroid } = msg;
      console.log(msg);

      io.emit("bird_update", msg);

      if (!isDuplicate(centroid)) {
        updateLastDetection(timestamp, centroid);
        console.log("New detection");

        try {
          await birdService.addBirdDetection(count, timestamp, image, centroid);
        } catch (err) {
          console.error("Error storing bird data:", err);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = setupBirdSocket;
