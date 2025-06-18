const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const birdRoutes = require("./routes/bird.routes");
const setupBirdSocket = require("./websockets/bird.socket");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/birds", birdRoutes);

// WebSocket
setupBirdSocket(io);

module.exports = { app, server };
