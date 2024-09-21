const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    // console.log("message :", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
