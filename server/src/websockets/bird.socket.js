const birdService = require("../services/bird.service");

const setupBirdSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    let lastUpdate = 0;
    const THRESHOLD = 5000; // 5 seconds in milliseconds

    socket.on("message", async (msg) => {
      const { count, timestamp, image } = msg;

      io.emit("bird_update", msg);

      if (count !== null && count > 0) {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastUpdate;

        console.log(
          `Received count: ${count}, Time since last update: ${timeSinceLastUpdate}ms`
        );

        // Check if it's been more than 5 seconds since last update
        if (timeSinceLastUpdate >= THRESHOLD) {
          console.log("Threshold reached, saving to database...");
          try {
            await birdService.addBirdDetection(count, timestamp, image);
            console.log(`Successfully saved count: ${count}`);
            lastUpdate = now;
          } catch (err) {
            console.error("POST error:", err);
          }
        } else {
          console.log(
            `Waiting for threshold... ${
              THRESHOLD - timeSinceLastUpdate
            }ms remaining`
          );
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = setupBirdSocket;
