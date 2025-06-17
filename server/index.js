const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer();

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (msg) => {
    console.log(msg);
    console.log(new Date(msg.timestamp));
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
