const birdService = require("../services/bird.service");

const setupBirdSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", async (msg) => {
      const { count, timestamp, image } = msg;

      console.log(msg.count);

      io.emit("bird_update", msg);

      try {
        await birdService.addBirdDetection(count, timestamp, image);
      } catch (err) {
        console.error("POST error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = setupBirdSocket;
