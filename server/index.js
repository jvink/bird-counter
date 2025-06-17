const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./db");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

app.use(cors());

app.use(express.json());

app.get("/api/birds", (req, res) => {
  const query = `
    SELECT count, timestamp, image 
    FROM bird_counter 
    ORDER BY timestamp DESC 
    LIMIT 100
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/birds/stats", (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_records,
      SUM(count) as total_birds,
      AVG(count) as avg_birds,
      MAX(count) as max_birds
    FROM bird_counter
  `;

  db.get(query, [], (err, stats) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(stats);
  });
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (msg) => {
    const { count, timestamp, image } = msg;

    db.run(
      "INSERT INTO bird_counter (count, timestamp, image) VALUES (?, ?, ?)",
      [count, timestamp, image],
      (err) => {
        if (err) {
          console.error("Error storing bird data:", err);
          return;
        }
        io.emit("bird_update", msg);
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
