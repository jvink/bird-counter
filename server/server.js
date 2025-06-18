const { server } = require("./src/app");

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
